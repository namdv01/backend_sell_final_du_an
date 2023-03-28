const BuyerService = require('./service');
const { orderSchema, editOrderSchema, commentSchema, getListOrderSchema,
  detailOrderSchema, } = require('./schema');

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
    ...query,
  }
  const response = await BuyerService.getListOrder(query);
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

module.exports = async (fastify) => {
  fastify.post('/order', { schema: orderSchema, preValidation: [fastify.auth, fastify.auth_buyer] }, orderHandler);
  fastify.put('/edit-order', { schema: editOrderSchema, preValidation: [fastify.auth, fastify.auth_buyer] }, editOrderHandler);
  fastify.post('/comment', { schema: commentSchema, preValidation: [fastify.auth, fastify.auth_buyer] }, commentHandler);
  fastify.get('/get-list-order', { schema: getListOrderSchema, preValidation: [fastify.auth, fastify.auth_buyer] }, getListOrderHandler);
  fastify.get('/detail-order/:id', { schema: detailOrderSchema, preValidation: [fastify.auth, fastify.auth_buyer] }, detailOrderHandler);

  fastify.setErrorHandler((error, req, rep) => {
    return rep.code(200).send({ code: -1, message: error.message });
  });
}