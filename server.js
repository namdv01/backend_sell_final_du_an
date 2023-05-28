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

fastify.register(require('@fastify/swagger'), {
  openapi: {
    openapi: '3.0.1',
    info: {
      title: 'Swagger',
      description: 'Swagger Api',
      version: '1.0.0',
      contact: {
        name: "Đỗ Văn Nam",
        email: "khonghoatay@gmail.com"
      },
    },
    servers: [
      {
        url: 'http://127.0.0.1:3666',
        description: 'Development server'
      },
      {
        url: 'https://backend-sell-final-du-an.vercel.app',
        description: 'Staging server'
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
        },
      }
    },
    security: [ { bearerAuth: [] } ],
  },
  hideUntagged: true
});

fastify.register(require('@fastify/swagger-ui'), {
  routePrefix: '/api/documentation',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: false,
    displayRequestDuration: true,
    displayOperationId: true,
    filter: true,
    syntaxHighlight: true,
    requestSnippetsEnabled: true,
    persistAuthorization: true
  },
  uiHooks: {
    onRequest: function (request, reply, next) { next() },
    preHandler: function (request, reply, next) { next() }
  },
  staticCSP: true,
  transformStaticCSP: (header) => {
    return header;
  },
  transformSpecification: (swaggerObject, req, reply) => {
    // swaggerObject.servers.unshift({
    //   url: req.hostname,
    //   description: 'Development server'
    // })
    return swaggerObject
  },
  transformSpecificationClone: true
});

fastify.register(require('./app'));

fastify.get('/abcd', (request, reply) => {
  reply.send({ hello: 'world' })
})

fastify.listen({ port: 3666, host: '0.0.0.0' }, (err, address) => {
  if (err) throw err
  // Server is now listening on ${address}
}) 