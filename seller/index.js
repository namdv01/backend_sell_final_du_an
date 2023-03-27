const { createProduct, editProduct, delProduct, getProduct, getListProduct,
  editOrder, getOrder, getListOrder,
  createShop, editShop, delShop, getListShop
} = require('./schema');
const SellerService = require('./service');

async function createProductHandler(req, rep) {
  const body = {
    ...req.body,
    id_user: req.user.id,
    host: req.headers.host,
  }
  const response = await SellerService.createProduct(body);
  return rep.send(response);
};

async function editProductHandler(req, rep) {
  const body = {
    id_product: req.params.id,
    id_user: req.user.id,
    host: req.headers.host,
    ...req.body,
  }
  const response = await SellerService.editProduct(body);
  return rep.send(response);
};

async function delProductHandler(req, rep) {
  const response = await SellerService.delProduct(req.user.id, req.params.id);
  return rep.send(response);
};

async function getProductHandler(req, rep) {
  const response = await SellerService.getProduct(req.user.id, req.params.id);
  return rep.send(response);
};

async function getListProductHandler(req, rep) {
  const query = {
    idShop: req.params.idShop,
    ...req.query,
  }
  const response = await SellerService.getListProduct(req.user.id, query);
  return rep.send(response);
};

async function editOrderHandler(req, rep) {
  const response = await SellerService.editOrder(req.body, req.user.id, req.params.id);
  return rep.send(response);
};

async function getOrderHandler(req, rep) {
  const response = await SellerService.getOrder(req.user.id, req.params.id);
  return rep.send(response);
};

async function getListOrderHandler(req, rep) {
  const response = await SellerService.getListOrder(req.user.id, req.params.idShop);
  return rep.send(response);
};

async function createShopHandler(req, rep) {
  const body = {
    ...req.body,
    id_user: req.user.id,
  }
  const response = await SellerService.createShop(body);
  return rep.send(response);
};

async function editShopHandler(req, rep) {
  const body = {
    ...req.body,
    id_user: req.user.id,
    id_shop: req.params.id,
    host: req.headers.host,
  }
  const response = await SellerService.editShop(body);
  return rep.send(response);
};

async function delShopHandler(req, rep) {
  const response = await SellerService.delShop(req.user.id, req.params.id);
  return rep.send(response);
};

async function getListShopHandler(req, rep) {
  const query = {
    ...req.query,
    id_user: req.user.id,
    host: req.headers.host,
  }
  const response = await SellerService.getListShop(query);
  return rep.send(response);
};

module.exports = async (fastify) => {

  fastify.post('/create-product', { schema: createProduct, preValidation: [fastify.auth, fastify.auth_seller] }, createProductHandler);
  fastify.put('/edit-product/:id', { schema: editProduct, preValidation: [fastify.auth, fastify.auth_seller] }, editProductHandler);
  fastify.delete('/del-product/:id', { schema: delProduct, preValidation: [fastify.auth, fastify.auth_seller] }, delProductHandler);
  fastify.get('/get-product/:id', { schema: getProduct, preValidation: [fastify.auth, fastify.auth_seller] }, getProductHandler);
  fastify.get('/get-list-product/:idShop', { schema: getListProduct, preValidation: [fastify.auth, fastify.auth_seller] }, getListProductHandler);

  fastify.put('/edit-order/:id', { schema: editOrder, preValidation: [fastify.auth, fastify.auth_seller] }, editOrderHandler);
  fastify.get('/get-order/:id', { schema: getOrder, preValidation: [fastify.auth, fastify.auth_seller] }, getOrderHandler);
  fastify.get('/get-list-order/:idShop', { schema: getListOrder, preValidation: [fastify.auth, fastify.auth_seller] }, getListOrderHandler);

  fastify.post('/create-shop', { schema: createShop, preValidation: [fastify.auth, fastify.auth_seller] }, createShopHandler);
  fastify.put('/edit-shop/:id', { schema: editShop, preValidation: [fastify.auth, fastify.auth_seller] }, editShopHandler);
  fastify.delete('/del-shop/:id', { schema: delShop, preValidation: [fastify.auth, fastify.auth_seller] }, delShopHandler);
  fastify.get('/get-list-shop', { schema: getListShop, preValidation: [fastify.auth, fastify.auth_seller] }, getListShopHandler);

  fastify.setErrorHandler((error, req, rep) => {
    return rep.code(200).send({ code: -1, message: error.message });
  });
}