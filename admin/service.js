const { connectPg: pg } = require('../base/connectDb');
const { PAGINATION } = require('../constant');
const MESSAGE = require('../constant/message');

const AdminService = {
  async getListUser(query) {
    const ques = pg('user');
    let lstUser;
    if (query.id) {
      lstUser = await ques.where({ id: query.id }).first();
    }

    if (query.id && !lstUser) {
      throw new Error(MESSAGE.ID_NOK);
    } else if (query.id) {
      delete lstUser.password;
      return {
        code: 0,
        message: MESSAGE.GET_LIST_USER_SUCCESS,
        payload: lstUser,
      }
    };

    if (query.role) {
      ques.where({ role });
    }
    query.size = +query.size || PAGINATION.SIZE;
    query.page = +query.page || PAGINATION.INDEX;
    const totalUser = await ques.clone().count().first();
    lstUser = await ques.limit(query.size).offset((query.page - 1) * query.size);
    lstUser = lstUser.map(({ password, ...rest }) => rest);
    return {
      code: 0,
      message: MESSAGE.GET_LIST_USER_SUCCESS,
      payload: {
        users: lstUser,
        page: query.page,
        size: query.size,
        totalPage: Math.ceil(totalUser.count / query.size),
      },
    }
  },

  async getListShop(query) {
    const ques = pg('shop');
    let lstShop;
    if (query.id) {
      lstUser = await ques.where({ id: query.id }).first();
    }

    if (query.id && !lstShop) {
      throw new Error(MESSAGE.ID_NOK);
    } else if (query.id) {
      return {
        code: 0,
        message: MESSAGE.GET_LIST_SHOP_SUCCESS,
        payload: lstShop,
      }
    };

    if (query.name) {
      ques.whereILike({ name: query.name });
    }
    query.size = +query.size || PAGINATION.SIZE;
    query.page = +query.page || PAGINATION.INDEX;
    const totalShop = await ques.clone().count().first();
    lstShop = await ques.limit(query.size).offset((query.page - 1) * query.size);
    return {
      code: 0,
      message: MESSAGE.GET_LIST_SHOP_SUCCESS,
      payload: {
        users: lstShop,
        page: query.page,
        size: query.size,
        totalPage: Math.ceil(totalShop.count / query.size),
      },
    }
  },

  async getListProduct(query) {
    const ques = pg('product');
    let lstProduct;
    if (query.id) {
      lstProduct = await ques.where({ id: query.id }).first();
      if (!lstProduct) {
        throw new Error(MESSAGE.ID_NOK);
      }
      const productImage = await pg('productImage').where({ id_product: query.id }).select('image');
      lstProduct.images = productImage;
      return {
        code: 0,
        message: MESSAGE.GET_LIST_PRODUCT_SUCCESS,
        payload: lstProduct
      }
    }
    if (query.name) {
      ques.whereILike({ name: query.name });
    }
    if (query.priceMin) {
      ques.where('price', '>=', query.priceMin);
    }
    if (query.priceMax) {
      ques.where('price', '<=', query.priceMax);
    }
    lstProduct = await ques.select
  },


}

module.exports = AdminService;