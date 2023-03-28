const baseSchema = {
  response: {
    200: {
      additionalProperties: false,
      type: 'object',
      required: ['code', 'message'],
      properties: {
        code: {
          type: 'integer',
          default: 0
        },
        message: {
          type: 'string',
          default: 0,
        },
        payload: {
          oneOf: [
            {
              additionalProperties: true,
              type: 'object'
            },
            {
              type: 'array'
            },
          ]
        }
      }
    }
  },
  email: {
    type: 'string',
    format: 'email',
  },
  password: {
    type: 'string',
    transform: ['trim'],
    pattern: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$',
    minLength: 8,
    maxLength: 32,
  },
  gender: {
    type: 'string',
    enum: ['male', 'female', 'other']
  },
  phone: {
    type: 'string',
    pattern: "(0[3|5|7|8|9])+([0-9]{8})", // phone vietnam
  },
  fullname: {
    type: 'string',
    transform: ['trim'],
    minLength: 1,
  },
  avatar: {
    type: 'string',
  },
  numberShop: {
    type: 'integer',
  },
  role: {
    type: 'string',
    enum: ['admin', 'seller', 'buyer']
  },
  page: {
    type: 'integer',
  },
  size: {
    type: 'integer',
  },
  priceMin: {
    type: 'integer',
    minimum: 0,
  },
  priceMax: {
    type: 'integer',
    minimum: 0,
    exclusiveMinimum: { $data: '1/priceMin' },
  },
  name: {
    type: 'string',
  },
  quantity: {
    type: 'integer',
    minimum: 0,
  },
  id: {
    type: 'string',
  },
  statusOrder: {
    type: 'string',
    enum: ['watting', 'cancel', 'delivering', 'done']
  },
  payment: {
    type: 'boolean',
  },
  address: {
    type: 'string'
  },
  logo: {
    type: 'string',
  },
  content: {
    type: 'string',
    minLength: 1,
    transform: ['trim'],
  },
  star: {
    type: 'integer',
    minimum: 1,
    maximum: 5,
  }
};

module.exports = baseSchema;
