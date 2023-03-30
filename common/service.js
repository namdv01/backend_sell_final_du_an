const { v4 } = require('uuid');
const passwordService = require('../base/password');
const imageService = require('../base/image');
const MESSAGE = require('../constant/message');
const cloudinary = require('../base/cloudinary');
const { checkLogin } = require('./schema');
const { connectPg: pg } = require('../base/connectDb');
const { PAGINATION } = require('../constant');

const CommonService = {
  async register(body) {
    const { email, password, gender, fullname, avatar, phone, role } = body;
    const query = pg.from('user');
    const existUsername = await query.clone().where({ email }).first();

    if (existUsername) {
      throw new Error(MESSAGE.EMAIL_BE_USED);
    }


    if (!imageService.checkType(avatar) || imageService.sizeBase64(avatar) > 5) {
      throw new Error(MESSAGE.AVATAR_INVALID);
    }

    // const save_avatar = await cloudinary.uploader.upload(avatar, {
    //   folder: '/sale_final/avatar'
    // });

    const publicAvatar = imageService.convertImage(avatar, 'avatar');

    const id = v4();
    const dataSave = {
      email,
      password: passwordService.hash(password),
      gender,
      fullname,
      phone,
      id,
      role,
      avatar: publicAvatar,
      // avatar: save_avatar.secure_url
    };

    await query.insert(dataSave);
    return {
      code: 0,
      message: MESSAGE.REGISTER_SUCCESS,
      // payload: dataSave,
    }

  },

  async login(body, { jwt, host }) {
    const { email, password } = body;
    const query = pg.from('user');
    const user = await query.clone().where({ email }).first();
    if (!user) {
      throw new Error(MESSAGE.INFORMATION_INVALID);
    }
    if (!passwordService.check(password, user.password)) {
      throw new Error(MESSAGE.INFORMATION_INVALID);
    }
    delete user.password;
    user.avatar = `${host}/public/img/${user.avatar}`;
    const token = jwt.sign({
      id: user.id,
      role: user.role,
    });
    return {
      code: 0,
      message: MESSAGE.LOGIN_SUCCESS,
      payload: {
        user,
        token,
        host
      }
    }
  },

  async checkLogin(token, { jwt }) {
    const user = await jwt.verify(token);
    if (!user) {
      throw new Error(MESSAGE.IS_NOT_AUTH);
    }
    return {
      code: 0,
      message: 'ok',
      payload: user,
    }
  },

  async changeProfile({ fullname, avatar, phone, gender }, id, host) {
    const query = pg('user').where({ id });
    const user = await query.clone().first();
    if (!user) {
      throw new Error(MESSAGE.ID_NOK);
    }
    const formUpdate = {};
    if (fullname) formUpdate.fullname = fullname;
    if (phone) formUpdate.phone = phone;
    if (gender) formUpdate.gender = gender;
    if (avatar && (!imageService.checkType(avatar) || imageService.sizeBase64(avatar) > 5)) {
      throw new Error(MESSAGE.AVATAR_INVALID);
    }
    if (avatar) {
      // const save_avatar = await cloudinary.uploader.upload(avatar, {
      //   folder: '/sale_final/avatar'
      // });
      // const public_id = user.avatar.split('/').splice(-1)[0].slice(0, 4);
      const publicAvatar = imageService.convertImage(avatar, 'avatar');
      formUpdate.avatar = publicAvatar;
      await query.update(formUpdate);
      imageService.deleteImage(user.avatar);
      // await cloudinary.uploader.destroy(public_id);
      formUpdate.avatar = `${host}/public/img/${formUpdate.avatar}`;
      return {
        code: 0,
        message: MESSAGE.UPDATE_PROFILE_SUCCESS,
        payload: {
          ...formUpdate
        }
      }
    }
    const updateUser = await query.update(formUpdate).returning('*');
    delete updateUser[0].password;
    updateUser[0].avatar = `${host}/public/img/${updateUser[0].avatar}`;
    return {
      code: 0,
      message: MESSAGE.UPDATE_PROFILE_SUCCESS,
      payload: updateUser[0],
    }
  },

  async changePassword({ curPassword, newPassword }, id) {
    const query = pg('user').where({ id });
    const user = await query.clone().first();
    if (!user) {
      throw new Error(MESSAGE.ID_NOK);
    }
    const checkPassword = passwordService.check(curPassword, user.password);
    if (!checkPassword) {
      throw new Error(MESSAGE.PASSWORD_INVALID);
    }
    const savePassword = passwordService.hash(newPassword);
    await query.update({ password: savePassword });
    return {
      code: 0,
      message: MESSAGE.CHANGE_PASSWORD_SUCCESS,
    }
  },

  async searchProduct({ pageIndex, pageSize, name, priceMin, priceMax }, host) {
    const query = pg('product');
    pageIndex = +pageIndex || PAGINATION.INDEX;
    pageSize = +pageSize || PAGINATION.SIZE;
    if (name) {
      query.whereILike('name', `%${name}%`);
    }
    if (priceMax) {
      query.where('price', '<=', priceMax);
    }
    if (priceMin) {
      query.where('price', '>=', priceMin);
    }
    const totalProduct = await query.clone().count().first();
    const lstProduct = await query
      .limit(pageSize)
      .offset(pageSize * (pageIndex - 1))
    const lstIdProduct = lstProduct.map((item) => item.id);
    const lstImageProduct = await pg('productImage')
      .whereIn('id_product', lstIdProduct).select('id_product', 'image');
    for (let i = 0; i < lstProduct.length; i++) {
      lstProduct[i].images = lstImageProduct.reduce((init, item) => {
        if (item.id_product === lstIdProduct[i]) {
          init.push(`${host}/public/img/${item.image}`);
        }
        return init;
      }, []);
    }
    return {
      code: 0,
      message: MESSAGE.SEARCH_PRODUCT_SUCCESS,
      payload: {
        pageIndex,
        pageSize,
        totalPage: Math.ceil(totalProduct.count / pageSize),
        products: lstProduct,
      }
    }
  },

  async getDetailProduct(idProduct, host) {
    const product = await pg('product')
      .where({ 'product.id': idProduct })
      .leftJoin('shop', 'product.id_shop', 'shop.id')
      .select('product.id as id', 'price', 'product.name as nameProduct', 'quantity',
        'shop.name as nameShop', 'address', 'logo')
      .first();
    if (!product) {
      throw new Error(MESSAGE.ID_NOK);
    }
    const imageProduct = await pg('productImage')
      .where({ id_product: idProduct })
      .select('image');
    product.images = imageProduct.map(item => `${host}/public/img/${item.image}`);
    product.logo = `${host}/public/img/${product.logo}`;
    return {
      code: 0,
      message: MESSAGE.SEARCH_PRODUCT_SUCCESS,
      payload: product,
    }
  },

}

module.exports = CommonService;