const baseSchema = require("../schema/base");
const MESSAGE = require("../constant/message");
const { ROLE } = require("../constant");

const getListUserSchema = {
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
      }
    }
  },
  response: baseSchema.response,
}

const getListShopSchema = {
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
    }
  }
}

const getListProductSchema = {
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
  response: baseSchema.response,
  params: {
    type: 'object',
    additionalProperties: false,
    properties: {
      id: {
        ...baseSchema.id,
      }
    }
  },
  body: {
    type: 'object',
    additionalProperties: false,
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
  response: baseSchema.response,
  params: {
    type: 'object',
    additionalProperties: false,
    properties: {
      id: {
        ...baseSchema.id,
      }
    }
  },
  body: {
    type: 'object',
    additionalProperties: false,
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
  response: baseSchema.response,
  params: {
    type: 'object',
    additionalProperties: false,
    properties: {
      id: {
        ...baseSchema.id,
      }
    }
  },
  body: {
    type: 'object',
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
          _: MESSAGE.PAYMENT_NOK
        }
      }
    }
  }
}

const editProductSchema = {
  response: baseSchema.response,
  params: {
    type: 'object',
    additionalProperties: false,
    properties: {
      id: {
        ...baseSchema.id,
      }
    }
  },
  body: {
    type: 'object',
    additionalProperties: false,
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
  response: baseSchema.response,
  body: {
    additionalProperties: false,
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
}

const delShopSchema = {
  response: baseSchema.response,
  params: {
    additionalProperties: false,
    properties: {
      id: {
        ...baseSchema.id
      }
    }
  }
}

const delProductSchema = {
  response: baseSchema.response,
  params: {
    additionalProperties: false,
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