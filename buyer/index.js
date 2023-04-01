const BuyerService = require('./service');
const { orderSchema, editOrderSchema, commentSchema, getListOrderSchema,
  detailOrderSchema, getListCommentSchema, detailCommentSchema,
  editCartSchema, getCartSchema } = require('./schema');

async function orderHandler(req, rep) {
  const body = {
    ...req.body,
    idUser: req.user.id,
  }
  const response = await BuyerService.order(body);
  return rep.send(response);
}

async function editOrderHandler(req, rep) {
  const body = {
    idUser: req.user.id,
    ...req.body,
  }
  const response = await BuyerService.editOrder(body);
  return rep.send(response);
}

async function commentHandler(req, rep) {
  const body = {
    idUser: req.user.id,
    ...req.body,
  }
  const response = await BuyerService.comment(body);
  return rep.send(response);
}

async function getListOrderHandler(req, rep) {
  const query = {
    idUser: req.user.id,
    ...req.query,
  }
  const response = await BuyerService.getListOrder(query);
  return rep.send(response);
}

async function getListCommentHandler(req, rep) {
  const query = {
    idUser: req.user.id,
    ...req.query,
  }
  const response = await BuyerService.getListComment(query);
  return rep.send(response);
}

async function detailOrderHandler(req, rep) {
  const query = {
    idUser: req.user.id,
    idOrder: req.params.id,
  }
  const response = await BuyerService.detailOrder(query);
  return rep.send(response);
}

async function detailCommentHandler(req, rep) {
  const query = {
    idUser: req.user.id,
    idComment: req.params.id,
  }
  const response = await BuyerService.detailComment(query);
  return rep.send(response);
}

async function editCartHandler(req, rep) {
  const body = {
    host: req.headers.host,
    idUser: req.user.id,
    ...req.body,
  }
  const response = await BuyerService.editCart(body);
  return rep.send(response);
}

async function getCartHandler(req, rep) {
  const query = {
    host: req.headers.host,
    idUser: req.user.id,
  }
  const response = await BuyerService.getCart(query);
  return rep.send(response);
}

module.exports = async (fastify) => {
  fastify.post('/order', { schema: orderSchema, preValidation: [fastify.auth, fastify.auth_buyer] }, orderHandler); // done
  fastify.put('/edit-order', { schema: editOrderSchema, preValidation: [fastify.auth, fastify.auth_buyer] }, editOrderHandler); // done
  fastify.post('/comment', { schema: commentSchema, preValidation: [fastify.auth, fastify.auth_buyer] }, commentHandler); // done
  fastify.get('/get-list-comment', { schema: getListCommentSchema, preValidation: [fastify.auth, fastify.auth_buyer] }, getListCommentHandler); // done
  fastify.get('/detail-comment/:id', { schema: detailCommentSchema, preValidation: [fastify.auth, fastify.auth_buyer] }, detailCommentHandler); // done
  fastify.get('/get-list-order', { schema: getListOrderSchema, preValidation: [fastify.auth, fastify.auth_buyer] }, getListOrderHandler); // done
  fastify.get('/detail-order/:id', { schema: detailOrderSchema, preValidation: [fastify.auth, fastify.auth_buyer] }, detailOrderHandler); // done
  fastify.put('/edit-cart', { schema: editCartSchema, preValidation: [fastify.auth, fastify.auth_buyer] }, editCartHandler);
  fastify.get('/get-cart', { schema: getCartSchema, preValidation: [fastify.auth, fastify.auth_buyer] }, getCartHandler);

  fastify.setErrorHandler((error, req, rep) => {
    return rep.code(200).send({ code: -1, message: error.message });
  });
}