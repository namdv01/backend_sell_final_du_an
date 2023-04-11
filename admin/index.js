const AdminService = require('./service');
const { register, getListUserSchema, getListShopSchema, getListOrderSchema,
  editUserSchema, editShopSchema, editOrderSchema, getListCommentSchema,
  editProductSchema, createShopSchema, createProductSchema,
  delShopSchema, delProductSchema, } = require('./schema');

async function registerHandler(req, rep) {
  const response = await AdminService.register(req.body);
  return rep.send(response);
}

async function getListUserHandler(req, rep) {
  const response = await AdminService.getListUser(req.query);
  return rep.send(response);
}

async function getListShopHandler(req, rep) {
  const response = await AdminService.getListShop(req.query);
  return rep.send(response);
}

async function getListOrderHandler(req, rep) {
  const response = await AdminService.getListOrder(req.query);
  return rep.send(response);
}

async function getListCommentHandler(req, rep) {
  const response = await AdminService.getListComment(req.query);
  return rep.send(response);
}

async function editUserHandler(req, rep) {
  const body = {
    ...req.body,
    idUser: req.params.id,
    host: req.headers.host,
  }
  const response = await AdminService.editUser(body);
  return rep.send(response);
}

async function editShopHandler(req, rep) {
  const body = {
    ...req.body,
    idShop: req.params.id,
    host: req.headers.host,
  }
  const response = await AdminService.editShop(body);
  return rep.send(response);
}

async function editOrderHandler(req, rep) {
  const body = {
    ...req.body,
    idOrder: req.params.id,
  }
  const response = await AdminService.editOrder(body);
  return rep.send(response);
}

async function editProductHandler(req, rep) {
  const body = {
    ...req.body,
    idProduct: req.params.id,
    host: req.headers.host,
  }
  const response = await AdminService.editProduct(body);
  return rep.send(response);
}

async function createShopHandler(req, rep) {
  const body = {
    ...req.body,
    host: req.headers.host,
  }
  const response = await AdminService.createShop(body);
  return rep.send(response);
}

async function createProductHandler(req, rep) {
  const body = {
    ...req.body,
    host: req.headers.host,
  }
  const response = await AdminService.createProduct(body);
  return rep.send(response);
}

async function delShopHandler(req, rep) {
  const response = await AdminService.delShop(req.params.id);
  return rep.send(response);
}

async function delProductHandler(req, rep) {
  const response = await AdminService.delProduct(req.params.id);
  return rep.send(response);
}

module.exports = async (fastify) => {
  fastify.post('/register', { schema: register }, registerHandler);

  fastify.get('/get-user', { schema: getListUserSchema, preValidation: [fastify.auth, fastify.auth_admin] }, getListUserHandler); // done
  fastify.get('/get-shop', { schema: getListShopSchema, preValidation: [fastify.auth, fastify.auth_admin] }, getListShopHandler); // done
  fastify.get('/get-order', { schema: getListOrderSchema, preValidation: [fastify.auth, fastify.auth_admin] }, getListOrderHandler);  // done
  fastify.get('/get-comment', { schema: getListCommentSchema, preValidation: [fastify.auth, fastify.auth_admin] }, getListCommentHandler);

  fastify.put('/edit-user/:id', { schema: editUserSchema, preValidation: [fastify.auth, fastify.auth_admin] }, editUserHandler);
  fastify.put('/edit-shop/:id', { schema: editShopSchema, preValidation: [fastify.auth, fastify.auth_admin] }, editShopHandler);
  fastify.put('/edit-order/:id', { schema: editOrderSchema, preValidation: [fastify.auth, fastify.auth_admin] }, editOrderHandler);
  fastify.put('/edit-product/:id', { schema: editProductSchema, preValidation: [fastify.auth, fastify.auth_admin] }, editProductHandler);

  fastify.post('/create-shop', { schema: createShopSchema, preValidation: [fastify.auth, fastify.auth_admin] }, createShopHandler);
  fastify.post('/create-product', { schema: createProductSchema, preValidation: [fastify.auth, fastify.auth_admin] }, createProductHandler);

  fastify.delete('/del-shop/:id', { schema: delShopSchema, preValidation: [fastify.auth, fastify.auth_admin] }, delShopHandler);
  fastify.delete('/del-product/:id', { schema: delProductSchema, preValidation: [fastify.auth, fastify.auth_admin] }, delProductHandler);

  fastify.setErrorHandler((error, req, rep) => {
    return rep.code(200).send({ code: -1, message: error.message });
  });
}