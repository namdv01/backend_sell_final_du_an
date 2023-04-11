const { createProduct, editProduct, delProduct, getProduct, getListProduct,
  editOrder, getOrder, getListOrder,
  createShop, editShop, delShop, getListShop
} = require('./schema');
const SellerService = require('./service');

async function createProductHandler(req, rep) {
  const body = {
    ...req.body,
    id_user: req.user.id,
  }
  const response = await SellerService.createProduct(body);
  return rep.send(response);
};

async function editProductHandler(req, rep) {
  const body = {
    id_product: req.params.id,
    id_user: req.user.id,
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
  const query = {
    idUser: req.user.id,
    idProduct: req.params.id,
  }
  const response = await SellerService.getProduct(query);
  return rep.send(response);
};

async function getListProductHandler(req, rep) {
  const query = {
    idShop: req.params.idShop,
    ...req.query,
    idUser: req.user.id,
  }
  const response = await SellerService.getListProduct(query);
  return rep.send(response);
};

async function editOrderHandler(req, rep) {
  const query = {
    ...req.body,
    idUser: req.user.id,
    idOrder: req.params.id
  }
  const response = await SellerService.editOrder(query);
  return rep.send(response);
};

async function getOrderHandler(req, rep) {
  const query = {
    idUser: req.user.id,
    idOrder: req.params.id
  }
  const response = await SellerService.getOrder(query);
  return rep.send(response);
};

async function getListOrderHandler(req, rep) {
  const query = {
    ...req.query,
    idUser: req.user.id,
    idShop: req.params.idShop
  }
  const response = await SellerService.getListOrder(query);
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
  }
  const response = await SellerService.getListShop(query);
  return rep.send(response);
};

module.exports = async (fastify) => {

  fastify.post('/create-product', { schema: createProduct, preValidation: [fastify.auth, fastify.auth_seller] }, createProductHandler); // done
  fastify.put('/edit-product/:id', { schema: editProduct, preValidation: [fastify.auth, fastify.auth_seller] }, editProductHandler);  // done
  fastify.delete('/del-product/:id', { schema: delProduct, preValidation: [fastify.auth, fastify.auth_seller] }, delProductHandler);
  fastify.get('/get-product/:id', { schema: getProduct, preValidation: [fastify.auth, fastify.auth_seller] }, getProductHandler); // done
  fastify.get('/get-list-product/:idShop', { schema: getListProduct, preValidation: [fastify.auth, fastify.auth_seller] }, getListProductHandler);  // done

  fastify.put('/edit-order/:id', { schema: editOrder, preValidation: [fastify.auth, fastify.auth_seller] }, editOrderHandler);
  fastify.get('/get-order/:id', { schema: getOrder, preValidation: [fastify.auth, fastify.auth_seller] }, getOrderHandler); // done
  fastify.get('/get-list-order/:idShop', { schema: getListOrder, preValidation: [fastify.auth, fastify.auth_seller] }, getListOrderHandler);  // done

  fastify.post('/create-shop', { schema: createShop, preValidation: [fastify.auth, fastify.auth_seller] }, createShopHandler);  //done
  fastify.put('/edit-shop/:id', { schema: editShop, preValidation: [fastify.auth, fastify.auth_seller] }, editShopHandler);
  fastify.delete('/del-shop/:id', { schema: delShop, preValidation: [fastify.auth, fastify.auth_seller] }, delShopHandler);
  fastify.get('/get-list-shop', { schema: getListShop, preValidation: [fastify.auth, fastify.auth_seller] }, getListShopHandler); // done

  fastify.setErrorHandler((error, req, rep) => {
    return rep.code(200).send({ code: -1, message: error.message });
  });
}