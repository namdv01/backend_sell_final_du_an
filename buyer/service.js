const { v4 } = require('uuid');
const { connectPg: pg } = require('../base/connectDb');
const { PAGINATION } = require('../constant');
const MESSAGE = require('../constant/message');
const dayjs = require('../base/dayjs');

const BuyerService = {
  async order(body) {
    const { detail, idUser } = body;
    let newOrder = {};
    let newDetail = [];
    let globalTrx;
    await pg.transaction(async (trx) => {
      newOrder = await pg.from('order').insert({
        id: v4(),
        id_buyer: idUser,
        status: 'watting', // mặc định
        date: dayjs.getDate(),
        payment: false,
      }).returning('id').transacting(trx);
      const listProduct = detail.map((de) => de.idProduct);
      const listProductCost = await pg.from('product').whereIn('id', listProduct)
        .select('id', 'price', 'quantity').transacting(trx);
      const fixDetail = detail.map((de) => {
        const product = listProductCost.find((co) => co.id === de.idProduct);
        if (product.quantity < de.quantity) {
          throw new Error(MESSAGE.ORDER_FAIL); // auto rollback
        }
        return {
          id: v4(),
          id_order: newOrder[0].id,
          id_product: de.idProduct,
          quantity: de.quantity,
          price: product.price,
        }
      });
      newDetail = await pg.from('orderDetail').insert(fixDetail)
        .returning('*').transacting(trx);
    });
    newOrder[0].detail = newDetail;
    return {
      code: 0,
      message: MESSAGE.ORDER_SUCCESS,
      payload: newOrder[0],
    }
  },

  async editOrder(body) {
    const { idOrder, status, idUser } = body;
    const ques = pg.from('order')
      .where({
        id: idOrder,
        id_buyer: idUser
      });
    const checkOwn = await ques.clone().first();
    if (!checkOwn) {
      return {
        code: 400,
        message: MESSAGE.NOT_OWN_ORDER
      }
    }
    if (checkOwn.status === 'watting' && status !== 'cancel') {
      throw new Error(MESSAGE.NOT_ACCEPT_CHANGE_STATUS_ORDER);
    }
    if (checkOwn.status === 'delivering' && status !== 'done') {
      throw new Error(MESSAGE.NOT_ACCEPT_CHANGE_STATUS_ORDER);
    }
    if (['cancel', 'done'].includes(checkOwn.status)) {
      throw new Error(MESSAGE.NOT_ACCEPT_CHANGE_STATUS_ORDER);
    }

    const updateOrder = await ques.update({ status }).returing('*').first();
    return {
      code: 0,
      message: MESSAGE.EDIT_ORDER_SUCCESS,
      payload: updateOrder,
    }
  },

  async comment(body) {
    const { idProduct, idOrder, content, star, idUser } = body;
    const checkOwnOrder = await pg.from('order')
      .where({
        id: idOrder,
        id_buyer: idUser,
      })
      .join('orderDetail', 'orderDetail.id_order', 'order.id')
      .where('orderDetail.id_product', idProduct).first();
    if (!checkOwnOrder) {
      return {
        code: 400,
        message: MESSAGE.NOT_OWN_ORDER
      }
    }
    const checkExistComment = await pg.from('comment')
      .where({
        id_product: idProduct,
        id_order: idOrder,
      }).first();

    if (checkExistComment) {
      throw new Error(MESSAGE.NOT_ACCEPT_COMMENT);
    }
    const fixBody = {
      id: v4(),
      id_product: idProduct,
      id_order: idOrder,
      content,
    }
    if (star) {
      fixBody.star = star;
    }
    const newComment = await pg.from('comment').insert(fixBody).returing('*').first();
    return {
      code: 0,
      message: MESSAGE.COMMENT_SUCCESS,
      payload: newComment,
    }

  },

  async getListOrder(query) {
    let { pageIndex, pageSize, idUser } = query;
    const ques = pg.from('order').where('id_buyer', idUser);
    const totalOrder = await ques.clone().count('*').first();
    pageIndex = +pageIndex || PAGINATION.INDEX;
    pageSize = +pageSize || PAGINATION.SIZE;
    let listOrder = await ques.limit(pageSize).offset((pageIndex - 1) * pageSize);
    const listIdOrder = listOrder.map((li) => li.id);
    const listDetailOrder = await pg.from('orderDetail').whereIn('id_order', listIdOrder)
      .join('product', 'product.id', 'orderDetail.id_product')
      .select({
        id: 'orderDetail.id',
        id_order: 'orderDetail.id_order',
        nameProduct: 'product.name',
        quantity: 'orderDetail.quantity',
        price: 'orderDetail.price',
      });
    listOrder = listOrder.map((lio) => {
      lio.detail = listDetailOrder.reduce((init, lid) => {
        if (lid.id_order === lio.id) {
          init.push(lid);
        }
        return init;
      }, []);
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

  async detailOrder(query) {
    const { idOrder, idUser } = query;
    const order = await pg.from('order')
      .where({
        id: idOrder,
        id_buyer: idUser,
      }).first();
    if (!order) {
      return {
        code: 400,
        message: MESSAGE.NOT_OWN_ORDER,
      }
    }
    const orderDetail = await pg.from('orderDetail')
      .where('id_order', idOrder)
      .join('product', 'product.id', 'orderDetail.id_product')
      .select({
        id: 'orderDetail.id',
        idOrder: 'orderDetail.id_order',
        nameProduct: 'product.name',
        quantity: 'orderDetail.quantity',
        price: 'orderDetail.price',
      });
    order.detail = orderDetail;
    return {
      code: 0,
      message: MESSAGE.GET_DETAIL_ORDER_SUCCESS,
      payload: order,
    }
  },
}

module.exports = BuyerService;