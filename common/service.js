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
    console.log(id);
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
      payload: dataSave,
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
    console.log(user);
    return {
      code: 0,
      message: 'ok',
      payload: user,
    }
  },

  async changeProfile({ fullname, avatar, phone, gender }, id) {
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
      const save_avatar = await cloudinary.uploader.upload(avatar, {
        folder: '/sale_final/avatar'
      });
      const public_id = user.avatar.split('/').splice(-1)[0].slice(0, 4);
      formUpdate.avatar = save_avatar;
      await query.update(formUpdate);
      await cloudinary.uploader.destroy(public_id);
      return {
        code: 0,
        message: MESSAGE.UPDATE_PROFILE_SUCCESS,
        payload: {
          ...formUpdate
        }
      }
    }
    await query.update(formUpdate);
    return {
      code: 0,
      message: MESSAGE.UPDATE_PROFILE_SUCCESS,
      payload: {
        ...formUpdate
      }
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
      payload: {},
    }
  },

  async searchProduct({ page, size, name, priceMin, priceMax }) {
    const query = pg('product');
    page = +page || PAGINATION.INDEX;
    size = +size || PAGINATION.SIZE;
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
      .limit(size)
      .offset(size * (page - 1))
    const lstIdProduct = lstProduct.map((item) => item.id);
    const lstImageProduct = await pg('productImage')
      .whereIn('id_product', lstIdProduct).select('id_product', 'image');
    for (let i = 0; i < lstProduct; i++) {
      lstProduct[i].images = lstImageProduct.filter((item) => item.id_product === lstIdProduct[i].id);
    }
    return {
      code: 0,
      message: MESSAGE.SEARCH_PRODUCT_SUCCESS,
      payload: {
        page,
        size,
        totalPage: Math.ceil(totalProduct.count / size),
        products: lstProduct,
      }
    }
  },

  async getDetailProduct(idProduct) {
    const product = await pg('product')
      .where({ id: idProduct })
      .leftJoin('shop', 'product.id_shop', 'shop.id')
      .select('product.id as id', 'price', 'product.name as nameProduct', 'quantity',
        'shop.name as nameShop', 'address', 'logo')
      .first();
    const imageProduct = await pg('productImage')
      .where({ id_product: idProduct })
      .select('image');
    product.images = imageProduct.map(item => item.image);
    return {
      code: 0,
      message: MESSAGE.SEARCH_PRODUCT_SUCCESS,
      payload: product,
    }
  },

}

module.exports = CommonService;