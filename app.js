'use strict'

const path = require('path')
const AutoLoad = require('@fastify/autoload')
const MESSAGE = require('./constant/message');
const ENV = require('./config');
const adminRoute = require('./admin');
const sellerRoute = require('./seller');
const buyerRoute = require('./buyer');
const commonRoute = require('./common');

// Pass --options via CLI arguments in command to enable these options.
module.exports.options = {}

module.exports = async function (fastify, opts) {
  // Place here your custom code!

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })

  fastify.register(require('@fastify/cors'), {
    origin: '*',
    // credentials: true,
  })

  fastify.register(require('@fastify/jwt'), {
    secret: 'namdv',
  })

  fastify.register(require('@fastify/static'), {
    root: path.join(__dirname, 'public'),
    prefix: '/public/', // optional: default '/'
  })

  fastify.decorate('auth', async (req, rep) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      throw new Error(MESSAGE.IS_NOT_AUTH);
    }
    await req.jwtVerify(token);
    const { user } = req;
    if (!user) {
      throw new Error(MESSAGE.IS_NOT_AUTH);
    }
  });

  fastify.decorate('auth_admin', async (req, rep) => {
    const { user } = req;
    if (user.role !== 'admin') {
      throw new Error(MESSAGE.IS_NOT_AUTH_ADMIN);
    }
  });

  fastify.decorate('auth_seller', async (req, rep) => {
    const { user } = req;
    if (user.role !== 'seller') {
      throw new Error(MESSAGE.IS_NOT_AUTH_SELLER);
    }
  });

  fastify.decorate('auth_buyer', async (req, rep) => {
    const { user } = req;
    if (user.role !== 'buyer') {
      throw new Error(MESSAGE.IS_NOT_AUTH_BUYER);
    }
  });

  fastify.register(adminRoute, {
    prefix: '/admin',
  });

  // fastify.register(sellerRoute, {
  //   prefix: '/seller',
  // });

  // fastify.register(buyerRoute, {
  //   prefix: '/buyer',
  // });

  fastify.register(commonRoute, {
    prefix: '/',
  });

}
