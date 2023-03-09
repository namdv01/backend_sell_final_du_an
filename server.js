const fastify = require('fastify')({
  logger: true,
  bodyLimit: 1024 * 1024 * 5,
});
const ajv = require('./base/ajv');
const ENV = require('./config');

fastify.setValidatorCompiler(({ schema }) => {
  return ajv.compile(schema);
});

fastify.setSchemaErrorFormatter((errors) => {
  const text = errors.map((error) => error.message);
  return new Error(text.join('\n'));
});

fastify.get('/abcd', (request, reply) => {
  reply.send({ hello: 'world' })
})
fastify.register(require('./app'));

fastify.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
  if (err) throw err
  // Server is now listening on ${address}
}) 