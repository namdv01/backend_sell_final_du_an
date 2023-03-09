const AdminService = require('./service');
const { register, getListUserSchema } = require('./schema');

async function registerHandler(req, rep) {
  const response = await AdminService.register(req.body);
  return rep.send(response);
}

async function getListUserHandler(req, rep) {
  const response = await AdminService.getListUser(req.query);
  return rep.send(response);
}

module.exports = async (fastify) => {
  fastify.post('/register', { schema: register }, registerHandler);
  fastify.get('/get-user', { schema: getListUserSchema, preValidation: [fastify.auth, fastify.auth_admin] }, getListUserHandler)

  fastify.setErrorHandler((error, req, rep) => {
    return rep.code(200).send({ code: -1, message: error.message });
  });
}