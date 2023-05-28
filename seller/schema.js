const baseSchema = require("../schema/base");
const MESSAGE = require("../constant/message");

const createProduct = {
  summary: 'Người bán tạo sản phẩm',
  description: 'Người bán tạo sản phẩm',
  tags: ['Seller (Người bán)'],
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
};

const editProduct = {
  summary: 'Người bán sửa sản phẩm',
  description: 'Người bán sửa sản phẩm',
  tags: ['Seller (Người bán)'],
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
      imagesAdd: {
        type: 'array',
        items: {
          type: 'string'
        },
        errorMessage: {
          _: MESSAGE.IMAGE_ARRAY
        }
      },
      imagesRemove: {
        type: 'array',
        items: {
          type: 'string'
        },
        errorMessage: {
          _: MESSAGE.IMAGE_ARRAY
        }
      }
    },
  }
};

const delProduct = {
  summary: 'Người bán xóa sản phẩm',
  description: 'Người bán xóa sản phẩm',
  tags: ['Seller (Người bán)'],
  response: baseSchema.response,
  params: {
    additionalProperties: false,
    properties: {
      id: {
        ...baseSchema.id
      }
    }
  }
};

const getProduct = {
  summary: 'Người bán lấy thông tin sản phẩm',
  description: 'Người bán lấy thông tin sản phẩm',
  tags: ['Seller (Người bán)'],
  response: baseSchema.response,
  params: {
    additionalProperties: false,
    properties: {
      id: {
        type: 'string',
      }
    }
  }
};

const getListProduct = {
  summary: 'Người bán lấy danh sách sản phẩm',
  description: 'Người bán lấy danh sách sản phẩm',
  tags: ['Seller (Người bán)'],
  response: baseSchema.response,
  params: {
    additionalProperties: false,
    type: 'object',
    properties: {
      idShop: {
        ...baseSchema.id,
        errorMessage: {
          _: MESSAGE.ID_NOK,
        }
      }
    }
  },
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
};

const editOrder = {
  summary: 'Người bán cập nhật thông tin đơn hàng',
  description: 'Người bán cập nhật thông tin đơn hàng',
  tags: ['Seller (Người bán)'],
  response: baseSchema.response,
  params: {
    additionalProperties: false,
    properties: {
      id: {
        ...baseSchema.id,
      }
    }
  },
  body: {
    additionalProperties: false,
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
          _: MESSAGE.PAYMENT_NOK,
        }
      }
    }
  }
};

const getOrder = {
  summary: 'Người bán lấy thông tin đơn hàng',
  description: 'Người bán lấy thông tin đơn hàng',
  tags: ['Seller (Người bán)'],
  response: baseSchema.response,
  params: {
    additionalProperties: false,
    properties: {
      id: {
        ...baseSchema.id,
      }
    }
  },
};

const getListOrder = {
  summary: 'Người bán lấy danh sách đơn hàng',
  description: 'Người bán lấy danh sách đơn hàng',
  tags: ['Seller (Người bán)'],
  response: baseSchema.response,
  query: {
    additionalProperties: false,
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
};

const createShop = {
  summary: 'Người bán tạo gian hàng',
  description: 'Người bán tạo gian hàng',
  tags: ['Seller (Người bán)'],
  response: baseSchema.response,
  body: {
    additionalProperties: false,
    required: ['name', 'address', 'logo'],
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
    },
    errorMessage: {
      required: {
        name: MESSAGE.NAME_SHOP_REQUIRED,
        address: MESSAGE.ADDRESS_SHOP_REQUIRED,
        logo: MESSAGE.LOGO_SHOP_REQUIRED,
      }
    }
  }
};

const editShop = {
  summary: 'Người bán sửa thông tin gian hàng',
  description: 'Người bán sửa thông tin gian hàng',
  tags: ['Seller (Người bán)'],
  response: baseSchema.response,
  params: {
    additionalProperties: false,
    properties: {
      id: {
        ...baseSchema.id,
      }
    }
  },
  body: {
    additionalProperties: false,
    properties: {
      name: {
        ...baseSchema.name,
      },
      address: {
        ...baseSchema.address,
      },
      logo: {
        ...baseSchema.logo,
      }
    }
  }
};

const delShop = {
  summary: 'Người bán xóa gian hàng',
  description: 'Người bán xóa gian hàng',
  tags: ['Seller (Người bán)'],
  response: baseSchema.response,
  params: {
    additionalProperties: false,
    properties: {
      id: {
        ...baseSchema.id,
      }
    }
  }
};

const getListShop = {
  summary: 'Người bán lấy danh sách gian hàng quản lý',
  description: 'Người bán lấy danh sách gian hàng quản lý',
  tags: ['Seller (Người bán)'],
  response: baseSchema.response,
  query: {
    additionalProperties: false,
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