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

    const save_avatar = await cloudinary.uploader.upload(avatar, {
      folder: '/sale_final/avatar'
    });

    // const publicAvatar = imageService.convertImage(avatar, 'avatar');

    const id = v4();
    const dataSave = {
      email,
      password: passwordService.hash(password),
      gender,
      fullname,
      phone,
      id,
      role,
      // avatar: publicAvatar,
      avatar: save_avatar.secure_url
    };

    await query.insert(dataSave);
    return {
      code: 0,
      message: MESSAGE.REGISTER_SUCCESS,
      // payload: dataSave,
    }

  },

  async login(body, { jwt }) {
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
      const save_avatar = await cloudinary.uploader.upload(avatar, {
        folder: '/sale_final/avatar'
      });
      const public_id = user.avatar.split('/').splice(-1)[0].slice(0, -4);
      // const publicAvatar = imageService.convertImage(avatar, 'avatar');
      formUpdate.avatar = save_avatar.secure_url;
      await query.update(formUpdate);
      // imageService.deleteImage(user.avatar);
      await cloudinary.uploader.destroy('sale_final/avatar/' + public_id);
      formUpdate.avatar = save_avatar.secure_url;
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

  async searchProduct({ pageIndex, pageSize, name, priceMin, priceMax }) {
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
          init.push(item.image);
        }
        return init;
      }, []);
      lstProduct[i].averageStar = 0;
      lstProduct[i].totalReview = 0;
    }
    const listStar = await pg('comment').whereIn('id_product', lstIdProduct)
      .select({
        averageStar: pg.raw(`AVG(star) :: numeric(10,1)`),
        totalReview: pg.raw(`COUNT(id)`),
        idProduct: 'id_product',
      })
      .groupBy('idProduct');
    for (let i = 0; i < lstProduct.length; i++) {
      for (let j = 0; j < listStar.length; j++) {
        if (lstProduct[i].id === listStar[j].idProduct) {
          lstProduct[i].averageStar = +listStar[j].averageStar;
          lstProduct[i].totalReview = +listStar[j].totalReview;
        }
      }
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

  async getDetailProduct(idProduct) {
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
    product.images = imageProduct.map(item => item.image);
    const commentProduct = await pg('comment').where('comment.id_product', idProduct)
      .join('order', 'order.id', 'comment.id_order')
      .join('user', 'user.id', 'order.id_buyer')
      .select({
        avatar: 'user.avatar',
        fullname: 'user.fullname',
        content: 'comment.content',
        star: 'comment.star'
      });
    product.comments = commentProduct;
    return {
      code: 0,
      message: MESSAGE.SEARCH_PRODUCT_SUCCESS,
      payload: product,
    }
  },

  async productInShop(idShop) {
    const shop = await pg('shop').where('id', idShop)
      .select('logo', 'name', 'address').first();
    const product = await pg('product')
      .leftJoin('orderDetail as od', 'product.id', 'od.id_product')  
      .where('id_shop', idShop)
      .select({
        'name': 'product.name',
        'id': 'product.id',
        'price': 'product.price',
        'id_shop': 'product.id_shop',
        'quantity': 'product.quantity',
        'quantityBeSold': pg.raw('sum(case when od.quantity is not null then od.quantity else 0 end)')
      })
      .groupBy('product.name', 'product.id', 'product.price', 'product.id_shop')
    const fixListProduct = product.map((p) => p.id);
    const productImage = await pg('productImage').whereIn('id_product', fixListProduct).select('id', 'image', 'id_product');
    for (let i = 0; i < product.length; i++) {
      product[i].images = productImage.reduce((init, item) => {
        if (item.id_product === fixListProduct[i]) {
          init.push(item.image);
        }
        return init;
      }, []);
    }
    return {
      code: 0,
      message: MESSAGE.SEARCH_PRODUCT_SUCCESS,
      payload: {
        shop,
        products: product
      }
    }
  },

  async productHot(query) {
    let { pageSize } = query;
    pageSize = +pageSize || 10;
    const products = await pg('product')
      .leftJoin('orderDetail as od', 'product.id', 'od.id_product')
      .leftJoin('shop', 'shop.id', 'product.id_shop')
      .select({
        'name': 'product.name',
        'id': 'product.id',
        'price': 'product.price',
        'id_shop': 'product.id_shop',
        'quantity': 'product.quantity',
        'logo': 'shop.logo',
        'nameShop': 'shop.name',
        'quantityBeSold': pg.raw('sum(case when od.quantity is not null then od.quantity else 0 end)')
      })
      .groupBy('product.name', 'product.id', 'product.price', 'product.id_shop', 'nameShop', 'logo')
      .limit(pageSize)
      .orderBy([
        { column: 'quantityBeSold', order: 'desc' },
        { column: 'name' },
        { column: 'price' },
        { column: 'quantity' }
      ]);
    const listIDProduct = products.map((item) => item.id);
    const productImage = await pg('productImage').whereIn('id_product', listIDProduct);
    for (let i = 0; i < listIDProduct.length; i++) {
      products[i].images = productImage.reduce((init, item) => {
        if (item.id_product === products[i].id) {
          init.push(item.image);
        }
        return init;
      }, []);
    }
    return {
      code: 0,
      message: MESSAGE.GET_LIST_PRODUCT_SUCCESS,
      payload: products,
    }
  }

}

module.exports = CommonService;