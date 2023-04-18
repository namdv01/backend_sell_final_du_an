const CommonService = require('./service');
const { register, login, changeProfile, checkLogin, changePassword, searchProduct, detailProduct, productInShop } = require('./schema');

async function registerHandler(req, rep) {
  const response = await CommonService.register(req.body);
  return rep.send(response);
};

async function loginHandler(req, rep) {
  const response = await CommonService.login(req.body, {
    jwt: this.jwt,
    host: req.headers.host,
  });
  return rep.send(response);
};

async function checkLoginHandler(req, rep) {
  const token = req.headers.authorization.split(' ')[1];
  const response = await CommonService.checkLogin(token, { jwt: this.jwt });
  return rep.send(response);
};

async function changeProfileHandler(req, rep) {
  const { host } = req.headers;
  const response = await CommonService.changeProfile(req.body, req.user.id, host);
  return rep.send(response);
};

async function changePasswordHandler(req, rep) {
  const response = await CommonService.changePassword(req.body, req.user.id);
  return rep.send(response);
}

async function searchProductHandler(req, rep) {
  const response = await CommonService.searchProduct(req.query);
  return rep.send(response);
}

async function getDetailProductHandler(req, rep) {
  const response = await CommonService.getDetailProduct(req.params.id);
  return rep.send(response);
}

async function productInShopHandler(req, rep) {
  const response = await CommonService.productInShop(req.params.idShop);
  return rep.send(response);
}

module.exports = async (fastify) => {
  fastify.post('/register', { schema: register }, registerHandler); // done
  fastify.post('/login', { schema: login }, loginHandler); // done
  fastify.get('/check-login', { schema: checkLogin }, checkLoginHandler);
  fastify.get('/test_authen', { preValidation: [fastify.auth] }, async (req, res) => {
    return res.send('on');
  });
  fastify.post('/change-profile', { schema: changeProfile, preValidation: [fastify.auth] }, changeProfileHandler);  // done
  fastify.post('/change-password', { schema: changePassword, preValidation: [fastify.auth] }, changePasswordHandler); // done
  fastify.get('/search-product', { schema: searchProduct }, searchProductHandler);  // done
  fastify.get('/detail-product/:id', { schema: detailProduct }, getDetailProductHandler); // done
  fastify.get('/product-in-shop/:idShop', { schema: productInShop }, productInShopHandler);

  fastify.setErrorHandler((error, req, rep) => {
    return rep.code(200).send({ code: -1, message: error.message });
  });
};