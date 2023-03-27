const baseSchema = require("../schema/base");
const MESSAGE = require("../constant/message");

const createProduct = {
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
      idShop: {
        ...baseSchema.id
      },
      imagesAdd: {
        type: 'array',
        errorMessage: {
          _: MESSAGE.IMAGE_ARRAY
        }
      },
      imagesRemove: {
        type: 'array',
        errorMessage: {
          _: MESSAGE.IMAGE_ARRAY
        }
      }
    },
  }
};

const delProduct = {
  response: baseSchema.response,
  params: {
    properties: {
      id: {
        type: 'string',
      }
    }
  }
};

const getProduct = {
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

const editOrder = {
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

const getListOrder = {
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