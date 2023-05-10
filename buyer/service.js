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

    const updateOrder = await ques.update({ status }).returning('*');
    return {
      code: 0,
      message: MESSAGE.EDIT_ORDER_SUCCESS,
      payload: updateOrder[0],
    }
  },

  async comment(body) {
    const { idProduct, idOrder, content, star, idUser } = body;
    const checkOwnOrder = await pg.from('order')
      .where({
        'order.id': idOrder,
        id_buyer: idUser,
        status: 'done',
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
    const newComment = await pg.from('comment').insert(fixBody).returning('*');
    return {
      code: 0,
      message: MESSAGE.COMMENT_SUCCESS,
      payload: newComment[0],
    }

  },

  async getListComment(query) {
    let { pageIndex, pageSize, idUser } = query;
    pageIndex = +pageIndex || PAGINATION.INDEX;
    pageSize = +pageSize || PAGINATION.SIZE;
    const ques = pg.from('comment')
      .join('order', 'order.id', 'comment.id_order')
      .join('product', 'product.id', 'comment.id_product')
      .where('order.id_buyer', idUser);
    const totalComment = await ques.clone().count('*').first();
    const listComment = await ques.limit(pageSize).offset((pageIndex - 1) * pageSize)
      .select({
        id: 'comment.id',
        content: 'comment.content',
        star: 'comment.star',
        id_order: 'comment.id_order',
        name: 'product.name',
      });
    return {
      code: 0,
      message: MESSAGE.GET_LIST_COMMENT_SUCCESS,
      payload: {
        totalPage: Math.ceil(+totalComment.count / pageSize),
        pageIndex,
        pageSize,
        comments: listComment,
      }
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
      return lio;
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

  async detailComment(query) {
    const { idComment, idUser } = query;
    const comment = await pg.from('comment')
      .join('order', 'order.id', 'comment.id_order')
      .join('orderDetail', 'orderDetail.id_order', 'order.id')
      .join('product', 'product.id', 'comment.id_product')
      .where({
        'comment.id': idComment,
        'order.id_buyer': idUser,
      })
      .select(
        {
          id: 'comment.id',
          content: 'comment.content',
          star: 'comment.star',
          name: 'product.name',
          id_order: 'order.id',
        }
      )
      .first();
    if (!comment) {
      throw new Error(MESSAGE.ID_NOK);
    }
    return {
      code: 0,
      message: MESSAGE.GET_DETAIL_COMMENT_SUCCESS,
      payload: comment,
    }
  },

  async editCart(body) {
    let { host, idUser, detail } = body;
    // check detail hợp lệ ko trùng lặp
    detail.sort((d1, d2) => {
      if (d1.idProduct === d2.idProduct) {
        throw new Error(MESSAGE.PRODUCTS_IN_CART);
      }
      return d1.idProduct - d2.idProduct;
    })
    const listIdProduct = detail.map((d) => d.idProduct);
    const ques = pg.from('cart').where('id_user', idUser);

    let cart = await ques.clone();
    const product = await pg.from('product').whereIn('id', listIdProduct);
    await pg.transaction(async (trx) => {
      // xóa giỏ cũ ghi đè giỏ mới
      await ques.clone().del().transacting(trx);

      //check số lượng trong giỏ vượt quá số lượng có của 1 product
      detail.forEach((d) => {
        const p = product.find((p) => p.id === d.idProduct);
        if (p.quantity < d.quantity) {
          throw new Error(MESSAGE.PRODUCTS_IN_CART);
        }
      });

      detail = detail.map((d) => {
        return {
          id: v4(),
          id_user: idUser,
          id_product: d.idProduct,
          quantity: d.quantity,
        }
      });
      if(detail.length > 0) {
        cart = await pg.from('cart').insert(detail).returning('*').transacting(trx);
      } else {
        return {
          code: 0,
          message: MESSAGE.EDIT_CART_SUCCESS,
          payload: [],
        } 
      }
      const listIdProduct = cart.map((item) => item.id_product);
      
      const products = await pg.from('product').whereIn('id', listIdProduct).select('id', 'name', 'price');
      const productImage = await pg.from('productImage').whereIn('id_product', listIdProduct);
      cart = cart.map((c) => {
        const i = productImage.find((pI) => pI.id_product === c.id_product);
        c.image = i.image;
        const j = products.find((p) => p.id === c.id_product);
        c.name = j.name;
        c.price = j.price;
        delete c.id_user;
        return c;
      });
    });
    return {
      code: 0,
      message: MESSAGE.EDIT_CART_SUCCESS,
      payload: cart,
    }
  },

  async getCart(query) {
    const { idUser } = query;
    let cart = await pg.from('cart').where('id_user', idUser)
      .join('product', 'product.id', 'cart.id_product')
      .select({
        id: 'cart.id',
        id_product: 'product.id',
        quantity: 'cart.quantity',
        name: 'product.name',
        price: 'product.price',
      });
    const listIdProduct = cart.map((item) => item.id_product);
    const productImage = await pg.from('productImage').whereIn('id_product', listIdProduct);
    cart = cart.map((c) => {
      const i = productImage.find((pI) => pI.id_product === c.id_product);
      c.image = i.image;
      return c;
    });
    return {
      code: 0,
      message: MESSAGE.GET_CART_SUCCESS,
      payload: cart,
    }
  }
}


module.exports = BuyerService;