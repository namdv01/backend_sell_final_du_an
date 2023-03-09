const baseSchema = require("../schema/base");
const MESSAGE = require("../constant/message");
const { ROLE } = require("../constant");

const getListUserSchema = {
  query: {
    additionalProperties: false,
    type: 'object',
    properties: {
      page: {
        ...baseSchema.page,
        errorMessage: {
          _: MESSAGE.PAGE_NOK
        }
      },
      size: {
        ...baseSchema.size,
        errorMessage: {
          _: MESSAGE.SIZE_NOK
        }
      },
      id: {
        type: 'string',
        errorMessage: {
          _: MESSAGE.ID_NOK
        }
      },
      role: {
        type: 'string',
        enum: ROLE,
      }
    }
  },

}

module.exports = {
  getListUserSchema,
}