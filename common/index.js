const CommonService = require('./service');
const { register, login, changeProfile, checkLogin, changePassword, searchProduct, detailProduct, } = require('./schema');

async function registerHandler(req, rep) {
  const response = await CommonService.register(req.body);
  return rep.send(response);
};

async function loginHandler(req, rep) {
  console.log(req.headers.host);
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
  const response = await CommonService.changeProfile(req.body, req.user.id);
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

module.exports = async (fastify) => {
  fastify.post('/register', { schema: register }, registerHandler);
  fastify.post('/login', { schema: login }, loginHandler);
  fastify.get('/check-login', { schema: checkLogin }, checkLoginHandler);
  fastify.get('/test_authen', { preValidation: [fastify.auth] }, async (req, res) => {
    return res.send('on');
  });
  fastify.post('/change-profile', { schema: changeProfile }, changeProfileHandler);
  fastify.post('/change-password', { schema: changePassword }, changePasswordHandler);
  fastify.get('/test', {}, (req, rep) => {
    return rep.send('ok');
  });
  fastify.get('/search-product', { schema: searchProduct }, searchProductHandler);
  fastify.get('/detail-product/:id', { schema: detailProduct }, getDetailProductHandler);

  fastify.setErrorHandler((error, req, rep) => {
    return rep.code(200).send({ code: -1, message: error.message });
  });
};