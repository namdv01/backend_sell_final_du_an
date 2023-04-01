const baseSchema = require("../schema/base");
const MESSAGE = require("../constant/message");
const { ROLE } = require("../constant");

const orderSchema = {
  response: baseSchema.response,
  body: {
    additionalProperties: false,
    type: 'object',
    properties: {
      detail: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            idProduct: {
              ...baseSchema.id,
              errorMessage: {
                _: MESSAGE.ID_NOK,
              }
            },
            quantity: {
              ...baseSchema.quantity,
              errorMessage: {
                _: MESSAGE.QUANTITY_NOK,
              }
            }
          }
        }
      }
    },
    required: ['detail'],
    errorMessage: {
      required: {
        detail: MESSAGE.ORDER_REQUIRED,
      }
    }
  }
}

const editOrderSchema = {
  response: baseSchema.response,
  body: {
    additionalProperties: false,
    type: 'object',
    properties: {
      idOrder: {
        ...baseSchema.id,
        errorMessage: {
          _: MESSAGE.ID_NOK
        }
      },
      status: {
        ...baseSchema.statusOrder,
        errorMessage: {
          _: MESSAGE.STATUS_ORDER_NOK,
        }
      }
    },
    required: ['idOrder', 'status'],
    errorMessage: {
      required: {
        idOrder: MESSAGE.ID_ORDER_REQUIRED,
        status: MESSAGE.STATUS_ORDER_REQUIRED,
      }
    }
  }
}

const commentSchema = {
  response: baseSchema.response,
  body: {
    additionalProperties: false,
    type: 'object',
    properties: {
      idProduct: {
        ...baseSchema.id,
        errorMessage: {
          _: MESSAGE.ID_NOK
        }
      },
      idOrder: {
        ...baseSchema.id,
        errorMessage: {
          _: MESSAGE.ID_NOK
        }
      },
      content: {
        ...baseSchema.content,
        errorMessage: {
          _: MESSAGE.COMMENT_CONTENT_NOK
        }
      },
      star: {
        ...baseSchema.star,
        errorMessage: {
          _: MESSAGE.STAR_NOK,
        }
      }
    },
    required: ['idProduct', 'idOrder', 'content'],
    errorMessage: {
      required: {
        idProduct: MESSAGE.ID_PRODUCT_REQUIRED,
        idOrder: MESSAGE.ID_ORDER_REQUIRED,
        content: MESSAGE.CONTENT_ORDER_REQUIRED,
      }
    }
  }
}

const getListCommentSchema = {
  response: baseSchema.response,
  query: {
    additionalProperties: false,
    type: 'object',
    properties: {
      pageIndex: {
        ...baseSchema.page,
        errorMessage: {
          _: MESSAGE.PAGE_NOK
        }
      },
      pageSize: {
        ...baseSchema.size,
        errorMessage: {
          _: MESSAGE.SIZE_NOK
        }
      }
    }
  }
}

const detailCommentSchema = {
  response: baseSchema.response,
  params: {
    additionalProperties: false,
    type: 'object',
    properties: {
      id: {
        ...baseSchema.id,
        errorMessage: {
          _: MESSAGE.ID_NOK
        }
      }
    }
  }
}

const getListOrderSchema = {
  response: baseSchema.response,
  query: {
    additionalProperties: false,
    type: 'object',
    properties: {
      pageIndex: {
        ...baseSchema.page,
        errorMessage: {
          _: MESSAGE.PAGE_NOK
        }
      },
      pageSize: {
        ...baseSchema.size,
        errorMessage: {
          _: MESSAGE.SIZE_NOK
        }
      }
    }
  }
}

const detailOrderSchema = {
  response: baseSchema.response,
  params: {
    additionalProperties: false,
    type: 'object',
    properties: {
      id: {
        ...baseSchema.id,
        errorMessage: {
          _: MESSAGE.ID_NOK
        }
      }
    }
  }
}

const editCartSchema = {
  response: baseSchema.response,
  body: {
    additionalProperties: false,
    type: 'object',
    properties: {
      detail: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            idProduct: {
              ...baseSchema.id,
              errorMessage: {
                _: MESSAGE.ID_NOK,
              }
            },
            quantity: {
              ...baseSchema.quantity,
              errorMessage: {
                _: MESSAGE.QUANTITY_NOK,
              }
            }
          }
        }
      }
    }
  }
}

const getCartSchema = {
  response: baseSchema.response,
}

module.exports = {
  orderSchema,
  editOrderSchema,
  commentSchema,
  getListCommentSchema,
  getListOrderSchema,
  detailOrderSchema,
  detailCommentSchema,
  editCartSchema,
  getCartSchema,
}