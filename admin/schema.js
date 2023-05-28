const baseSchema = require("../schema/base");
const MESSAGE = require("../constant/message");
const { ROLE } = require("../constant");

const getListUserSchema = {
  summary: 'Quản trị viên lấy danh sách người dùng',
  description: 'Quản trị viên lấy danh sách người dùng',
  tags: ['Admin (Quản trị viên)'],
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
      },
      id: {
        ...baseSchema.id,
        errorMessage: {
          _: MESSAGE.ID_NOK
        }
      },
      role: {
        ...baseSchema.role,
        errorMessage: {
          _: MESSAGE.ROLE_INVALID
        }
      },
      fullname: {
        ...baseSchema.fullname,
        errorMessage: {
          _: MESSAGE.FULLNAME_INVALID
        }
      }
    }
  },
  response: baseSchema.response,
}

const getListShopSchema = {
  summary: 'Quản trị viên lấy danh sách gian hàng',
  description: 'Quản trị viên lấy danh sách gian hàng',
  tags: ['Admin (Quản trị viên)'],
  response: baseSchema.response,
  query: {
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
    },
    id: {
      ...baseSchema.id,
      errorMessage: {
        _: MESSAGE.ID_NOK
      }
    },
    idUser: {
      ...baseSchema.id,
      errorMessage: {
        _: MESSAGE.ID_NOK
      }
    },
    name: {
      ...baseSchema.name,
      errorMessage: {
        _: MESSAGE.NAME_NOK,
      }
    }
  }
}

const getListProductSchema = {
  summary: 'Quản trị viên lấy danh sách sản phẩm',
  description: 'Quản trị viên lấy danh sách sản phẩm',
  tags: ['Admin (Quản trị viên)'],
  response: baseSchema.response,
  query: {
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
    },
    id: {
      ...baseSchema.id,
      errorMessage: {
        _: MESSAGE.ID_NOK
      }
    },
    idShop: {
      ...baseSchema.id,
      errorMessage: {
        _: MESSAGE.ID_NOK
      }
    }
  }
}

const getListOrderSchema = {
  summary: 'Quản trị viên lấy danh sách đơn hàng',
  description: 'Quản trị viên lấy danh sách đơn hàng',
  tags: ['Admin (Quản trị viên)'],
  response: baseSchema.response,
  query: {
    id: {
      ...baseSchema.id,
    },
    idBuyer: {
      ...baseSchema.id,
    },
    status: {
      ...baseSchema.statusOrder,
      errorMessage: {
        _: MESSAGE.STATUS_ORDER_NOK
      }
    },
    payment: {
      ...baseSchema.payment,
      errorMessage: {
        _: MESSAGE.PAYMENT_NOK
      }
    },
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
    },
  }
}

const getListCommentSchema = {
  summary: 'Quản trị viên lấy danh sách đánh giá đơn hàng',
  description: 'Quản trị viên lấy danh sách đánh giá đơn hàng',
  tags: ['Admin (Quản trị viên)'],
  response: baseSchema.response,
  query: {
    idProduct: {
      ...baseSchema.id,
    },
    idOrder: {
      ...baseSchema.id,
    },
    star: {
      ...baseSchema.star,
      errorMessage: {
        _: MESSAGE.STAR_NOK
      }
    },
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
    },
  }
}

const editUserSchema = {
  summary: 'Quản trị viên sửa thông tin người dùng',
  description: 'Quản trị viên sửa thông tin người dùng',
  tags: ['Admin (Quản trị viên)'],
  response: baseSchema.response,
  params: {
    type: 'object',
    additionalProperties: false,
type: 'object',
    properties: {
      id: {
        ...baseSchema.id,
      }
    }
  },
  body: {
    type: 'object',
    additionalProperties: false,
type: 'object',
    properties: {
      fullname: {
        ...baseSchema.fullname,
        errorMessage: {
          _: MESSAGE.FULLNAME_INVALID
        }
      },
      avatar: {
        ...baseSchema.avatar
      },
      gender: {
        ...baseSchema.gender,
        errorMessage: {
          _: MESSAGE.GENDER_INVALID
        }
      },
      numberShop: {
        ...baseSchema.numberShop
      },
      password: {
        ...baseSchema.password,
        errorMessage: {
          _: MESSAGE.PASSWORD_INVALID
        }
      },
      phone: {
        ...baseSchema.phone,
        errorMessage: {
          _: MESSAGE.PHONE_INVALID,
        }
      }
    }
  }
}

const editShopSchema = {
  summary: 'Quản trị viên sửa thông tin sản phẩm',
  description: 'Quản trị viên sửa thông tin sản phẩm',
  tags: ['Admin (Quản trị viên)'],
  response: baseSchema.response,
  params: {
    type: 'object',
    additionalProperties: false,
type: 'object',
    properties: {
      id: {
        ...baseSchema.id,
      }
    }
  },
  body: {
    type: 'object',
    additionalProperties: false,
type: 'object',
    properties: {
      name: {
        ...baseSchema.name
      },
      address: {
        ...baseSchema.address,
      },
      logo: {
        ...baseSchema.logo
      }
    }
  }
}

const editOrderSchema = {
  summary: 'Quản trị viên sửa thông tin đơn hàng',
  description: 'Quản trị viên sửa thông tin đơn hàng',
  tags: ['Admin (Quản trị viên)'],
  response: baseSchema.response,
  params: {
    type: 'object',
    additionalProperties: false,
type: 'object',
    properties: {
      id: {
        ...baseSchema.id,
      }
    }
  },
  body: {
    type: 'object',
    additionalProperties: false,
type: 'object',
    properties: {
      status: {
        ...baseSchema.statusOrder,
        errorMessage: {
          _: MESSAGE.STATUS_ORDER_NOK
        }
      },
      payment: {
        ...baseSchema.payment,
        errorMessage: {
          _: MESSAGE.PAYMENT_NOK
        }
      }
    }
  }
}

const editProductSchema = {
  summary: 'Quản trị viên sửa thông tin sản phẩm',
  description: 'Quản trị viên sửa thông tin sản phẩm',
  tags: ['Admin (Quản trị viên)'],
  response: baseSchema.response,
  params: {
    type: 'object',
    additionalProperties: false,
type: 'object',
    properties: {
      id: {
        ...baseSchema.id,
      }
    }
  },
  body: {
    type: 'object',
    additionalProperties: false,
type: 'object',
    properties: {
      name: {
        ...baseSchema.name,
      },
      quantity: {
        ...baseSchema.quantity,
        errorMessage: {
          _: MESSAGE.QUANTITY_NOK
        }
      },
      price: {
        ...baseSchema.price,
        errorMessage: {
          _: MESSAGE.PRICE_NOK
        }
      },
      imagesAdd: {
        type: 'array',
        items: {
          type: 'string',
        },
        errorMessage: {
          _: MESSAGE.IMAGE_ARRAY
        }
      },
      imagesRemove: {
        type: 'array',
        items: {
          type: 'string',
        },
        errorMessage: {
          _: MESSAGE.IMAGE_ARRAY
        }
      }
    }
  }
}

const createShopSchema = {
  summary: 'Quản trị viên tạo gian hàng',
  description: 'Quản trị viên tạo gian hàng',
  tags: ['Admin (Quản trị viên)'],
  response: baseSchema.response,
  body: {
    additionalProperties: false,
type: 'object',
    required: ['name', 'address', 'logo', 'idUser'],
    properties: {
      name: {
        ...baseSchema.name
      },
      address: {
        ...baseSchema.address,
      },
      logo: {
        ...baseSchema.logo
      },
      idUser: {
        ...baseSchema.id,
      }
    },
    errorMessage: {
      required: {
        name: MESSAGE.NAME_SHOP_REQUIRED,
        address: MESSAGE.ADDRESS_SHOP_REQUIRED,
        logo: MESSAGE.LOGO_SHOP_REQUIRED,
        idUser: MESSAGE.ID_USER_REQUIRED,
      }
    }
  }
}

const createProductSchema = {
  summary: 'Quản trị viên tạo sản phẩm',
  description: 'Quản trị viên tạo sản phẩm',
  tags: ['Admin (Quản trị viên)'],
  response: baseSchema.response,
  body: {
    required: ['name', 'quantity', 'price', 'idShop', 'images'],
    errorMessage: {
      required: {
        name: MESSAGE.NAME_NOK,
        quantity: MESSAGE.QUANTITY_NOK,
        price: MESSAGE.PRICE_NOK,
        idShop: MESSAGE.ID_NOK,
        images: MESSAGE.IMAGE_ARRAY,
      }
    },
    additionalProperties: false,
type: 'object',
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
      idShop: {
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
}

const delShopSchema = {
  summary: 'Quản trị viên xóa gian hàng',
  description: 'Quản trị viên xóa gian hàng',
  tags: ['Admin (Quản trị viên)'],
  response: baseSchema.response,
  params: {
    additionalProperties: false,
type: 'object',
    properties: {
      id: {
        ...baseSchema.id
      }
    }
  }
}

const delProductSchema = {
  summary: 'Quản trị viên xóa sản phẩm',
  description: 'Quản trị viên xóa sản phẩm',
  tags: ['Admin (Quản trị viên)'],
  response: baseSchema.response,
  params: {
    additionalProperties: false,
type: 'object',
    properties: {
      id: {
        ...baseSchema.id,
      }
    }
  }
}

module.exports = {
  getListUserSchema,
  getListOrderSchema,
  getListShopSchema,
  getListProductSchema,
  getListCommentSchema,
  editUserSchema,
  editShopSchema,
  editOrderSchema,
  editProductSchema,
  createShopSchema,
  createProductSchema,
  delShopSchema,
  delProductSchema,
}