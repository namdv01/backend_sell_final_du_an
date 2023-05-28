const baseSchema = require("../schema/base");
const MESSAGE = require("../constant/message");
const { ROLE } = require("../constant");

const orderSchema = {
  summary: 'Người mua đặt đơn hàng',
  description: 'Người mua đặt đơn hàng',
  tags: ['Buyer (Người mua)'],
  response: baseSchema.response,
  body: {
    additionalProperties: false,
type: 'object',
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
  summary: 'Người mua cập nhật đơn hàng',
  description: 'Người mua cập nhật đơn hàng',
  tags: ['Buyer (Người mua)'],
  response: baseSchema.response,
  body: {
    additionalProperties: false,
type: 'object',
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
  summary: 'Người mua bình luận sản phẩm đã mua',
  description: 'Người mua bình luận sản phẩm đã mua',
  tags: ['Buyer (Người mua)'],
  response: baseSchema.response,
  body: {
    additionalProperties: false,
type: 'object',
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
  summary: 'Người mua lấy danh sách bình luận',
  description: 'Người mua lấy danh sách bình luận',
  tags: ['Buyer (Người mua)'],
  response: baseSchema.response,
  query: {
    additionalProperties: false,
type: 'object',
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
  summary: 'Người mua xem chi tiết bình luận',
  description: 'Người mua xem chi tiết bình luận',
  tags: ['Buyer (Người mua)'],
  response: baseSchema.response,
  params: {
    additionalProperties: false,
type: 'object',
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
  summary: 'Người mua xem danh sách đơn hàng',
  description: 'Người mua xem danh sách đơn hàng',
  tags: ['Buyer (Người mua)'],
  response: baseSchema.response,
  query: {
    additionalProperties: false,
type: 'object',
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
  summary: 'Người mua xem chi tiết đơn hàng',
  description: 'Người mua xem chi tiết đơn hàng',
  tags: ['Buyer (Người mua)'],
  response: baseSchema.response,
  params: {
    additionalProperties: false,
type: 'object',
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
  summary: 'Người mua chỉnh sửa giỏ hàng',
  description: 'Người mua chỉnh sửa giỏ hàng',
  tags: ['Buyer (Người mua)'],
  response: baseSchema.response,
  body: {
    additionalProperties: false,
type: 'object',
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
  summary: 'Người mua lấy thông tin giỏ hàng',
  description: 'Người mua lấy thông tin giỏ hàng',
  tags: ['Buyer (Người mua)'],
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