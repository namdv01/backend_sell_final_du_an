const baseSchema = require("../schema/base");
const MESSAGE = require("../constant/message");

const createProduct = {
  response: baseSchema.response,
  body: {
    additionalProperties: false,
    type: 'object',
    properties: {
      name: {
        ...baseSchema.name,
        errorMessage: {
          _: MESSAGE.NAME_NOK,
        }
      },
      quantity: {
        ...baseSchema.quantity,
        errorMessage: {
          _: MESSAGE.QUANTITY_NOK,
        }
      },
      price: {
        ...baseSchema.priceMin,
        errorMessage: {
          _: MESSAGE.PRICE_NOK
        }
      },
      id_shop: {
        ...baseSchema.id
      },
      images: {
        type: 'array',
        errorMessage: {
          _: MESSAGE.IMAGE_ARRAY
        }
      }
    }
  }
};

const editProduct = {
  response: baseSchema.response,
  body: {
    additionalProperties: false,
    type: 'object',
    properties: {

    },
  }
};

const delProduct = {
  response: baseSchema.response
};

const getProduct = {
  response: baseSchema.response
};

const getListProduct = {
  response: baseSchema.response
};

const editOrder = {
  response: baseSchema.response
};

const getOrder = {
  response: baseSchema.response
};

const getListOrder = {
  response: baseSchema.response
};

const createShop = {
  response: baseSchema.response
};

const editShop = {
  response: baseSchema.response
};

const delShop = {
  response: baseSchema.response
};

const getListShop = {
  response: baseSchema.response
};

module.exports = {
  createProduct,
  editProduct,
  delProduct,
  getProduct,
  getListProduct,
  editOrder,
  getOrder,
  getListOrder,
  createShop,
  editShop,
  delShop,
  getListShop,
}