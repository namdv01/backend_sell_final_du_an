const { connectPg: pg } = require('../base/connectDb');
const { PAGINATION } = require('../constant');
const MESSAGE = require('../constant/message');

const AdminService = {
  async getListUser(query) {
    let { id, role, pageSize, pageIndex, host } = query;
    const ques = pg('user');
    let lstUser;
    if (id) {
      lstUser = await ques.clone().where({ id }).first()
        .select('id', 'email', 'fullname', 'phone', 'avatar', 'gender', 'role', 'numberShop');
      if (!lstUser) {
        throw new Error(MESSAGE.ID_NOK);
      }
      lstUser.avatar = `${host}/public/img/${lstUser.avatar}`;
      return {
        code: 0,
        message: MESSAGE.GET_LIST_USER_SUCCESS,
        payload: lstUser
      }
    }
    if (role) {
      ques.where({ role });
    }
    pageSize = +pageSize || PAGINATION.SIZE;
    pageIndex = +pageIndex || PAGINATION.INDEX;
    const totalUser = await ques.clone().count('*').first();
    lstUser = await ques.limit(pageSize).offset((pageIndex - 1) * pageSize)
      .select('id', 'email', 'fullname', 'phone', 'avatar', 'gender', 'role', 'numberShop');
    lstUser = lstUser.map((u) => ({ ...u, avatar: `${host}/public/img/${u.avatar}` }));
    return {
      code: 0,
      message: MESSAGE.GET_LIST_USER_SUCCESS,
      payload: {
        users: lstUser,
        pageSize,
        pageIndex,
        totalPage: Math.ceil(+totalUser.count / pageSize),
      }
    }
  },

  async getListShop(query) {
    const { id, idUser, pageIndex, pageSize, host } = query;
    const ques = pg('shop');
    let lstShop;
    if (id) {
      lstShop = await ques.where({ id }).first();
      if (!lstShop) {
        throw new Error(MESSAGE.ID_NOK);
      }
      lstShop.logo = `${host}/public/img/${lstShop.logo}`;
      return {
        code: 0,
        message: MESSAGE.GET_LIST_SHOP_SUCCESS,
        payload: lstShop,
      }
    }
    if (idUser) {
      ques.where({ id_user: idUser });
    }
    const totalShop = await ques.clone().count('*').first();
    pageSize = +pageSize || PAGINATION.SIZE;
    pageIndex = +pageIndex || PAGINATION.INDEX;
    lstShop = await ques.limit(pageSize).offset((pageIndex - 1) * pageSize);
    lstShop = lstShop.map((shop) => ({ ...shop, logo: `${host}/public/img/${shop.logo}` }));
    return {
      code: 0,
      message: MESSAGE.GET_LIST_PRODUCT_SUCCESS,
      payload: {
        shops: lstShop,
        pageIndex,
        pageSize,
        totalPage: Math.ceil(+totalShop.count / pageSize),
      }
    }
  },

  async getListProduct(query) {
    const { id, idShop, pageIndex, pageSize } = query;
    const ques = pg('product');
    let lstProduct;
    let lstImage;
    if (id) {
      lstProduct = await ques.where({ id }).first();
      if (!lstProduct) {
        throw new Error(MESSAGE.ID_NOK);
      }
      lstImage = await pg.from('productImage').where({ id_product: id }).select('image');
      lstImage = lstImage.map((image) => `${host}/public/img/${image.image}`);
      lstProduct.images = lstImage;
      return {
        code: 0,
        message: MESSAGE.GET_LIST_PRODUCT_SUCCESS,
        payload: lstProduct,
      }
    }
    if (idShop) {
      ques.where({ id_shop: idShop });
    }
    const totalProduct = await ques.clone().count('*').first();
    pageSize = +pageSize || PAGINATION.SIZE;
    pageIndex = +pageIndex || PAGINATION.INDEX;
    lstProduct = await ques().limit(pageSize).offset((pageIndex - 1) * pageSize);
    const lstIdProduct = lstProduct.map((pro) => pro.id);
    lstImage = await pg.from('productImage').whereIn('id_product', lstIdProduct).select('image', 'id_product');
    lstProduct = lstProduct.map((pro) => {
      pro.images = lstImage.reduce((init, im) => {
        if (im.id_product === pro.id) {
          init.push(im.image);
        }
        return init;
      }, []);
      return pro;
    });
    return {
      code: 0,
      message: MESSAGE.GET_LIST_PRODUCT_SUCCESS,
      payload: {
        products: lstProduct,
        pageSize,
        pageIndex,
        totalPage: Math.ceil(+totalProduct.count / pageSize),
      }
    }
  },

  async getListOrder(query) {
    let { id, idBuyer, status, payment, pageIndex, pageSize } = query;
    let listOrder;
    let detailOrder;
    const ques = pg.from('order');
    if (id) {
      listOrder = await ques.where({ id }).first();
      if (!listOrder) {
        throw new Error(MESSAGE.ID_NOK);
      }
      detailOrder = await pg.from('orderDetail').where({ id_order: id })
        .join('product', 'product.id', 'orderDetail.id_product')
        .select({
          id: 'orderDetail.id',
          name: 'product.name',
          price: 'orderDetail.price',
          quantity: 'orderDetail.quantity',
        });
      listOrder.detail = detailOrder;
      return {
        code: 0,
        message: MESSAGE.GET_LIST_ORDER_SUCCESS,
        payload: detailOrder,
      }
    }
    if (idBuyer) {
      ques.where('id_buyer', idBuyer);
    }
    if (status) {
      ques.where('status', status);
    }
    if (payment) {
      ques.where('payment', payment);
    }
    const totalOrder = await ques.clone().count('*').first();
    pageSize = +pageSize || PAGINATION.SIZE;
    pageIndex = +pageIndex || PAGINATION.INDEX;
    listOrder = await ques.limit(pageSize).offset((pageIndex - 1) * pageSize);
    const listIdOrder = listOrder.map((lo) => lo.id);
    detailOrder = await pg.from('orderDetail').whereIn('id_order', listIdOrder)
      .join('product', 'product.id', 'orderDetail.id_product')
      .select({
        id: 'orderDetail.id',
        id_order: 'orderDetail.id_order',
        name: 'product.name',
        price: 'orderDetail.price',
        quantity: 'orderDetail.quantity',
      });
    listOrder = listOrder.map((lo) => {
      lo.detail = detailOrder.reduce((init, de) => {
        if (de.id_order === lo.id) {
          const { id_order, ...rest } = de;
          init.push(rest);
        }
        return init;
      }, []);
      return lo;
    });

    return {
      code: 0,
      message: MESSAGE.GET_LIST_ORDER_SUCCESS,
      payload: {
        orders: listOrder,
        pageSize,
        pageIndex,
        totalPage: Math.ceil(+totalOrder.count / pageSize),
      }
    }
  },

  async getListComment(query) {

  },

  async editUser(body) {

  },

  async editShop(body) {

  },

  async editOrder(body) {

  },

  async createShop(body) {

  },

  async createProduct(body) {

  },

  async delShop(idShop) {

  },

  async delProduct(idProduct) {

  },
}

module.exports = AdminService;