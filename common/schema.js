const baseSchema = require("../schema/base");
const MESSAGE = require("../constant/message");

const register = {
  summary: 'Đăng ký người dùng mới',
  description: 'Đăng ký người dùng mới',
  tags: ['Common (Tác vụ chung người dùng)'],
  body: {
    required: ['email', 'password', 'fullname', 'gender', 'phone', 'avatar', 'role'],
    type: 'object',
    additionalProperties: false,
type: 'object',
    // avatar not required salt in crypto
    properties: {
      email: {
        ...baseSchema.email,
        errorMessage: {
          _: MESSAGE.EMAIL_INVALID
        }
      },
      password: {
        ...baseSchema.password,
        errorMessage: {
          _: MESSAGE.PASSWORD_INVALID
        }
      },
      fullname: {
        ...baseSchema.fullname,
        errorMessage: {
          _: MESSAGE.FULLNAME_INVALID
        }
      },
      gender: {
        ...baseSchema.gender,
        errorMessage: {
          _: MESSAGE.GENDER_INVALID
        }
      },
      avatar: {
        ...baseSchema.avatar,
        errorMessage: {
          _: MESSAGE.AVATAR_INVALID
        }
      },
      phone: {
        ...baseSchema.phone,
        errorMessage: {
          _: MESSAGE.PHONE_INVALID
        }
      },
      role: {
        ...baseSchema.role,
        errorMessage: {
          _: MESSAGE.ROLE_INVALID
        }
      }
    },
    errorMessage: {
      required: {
        email: MESSAGE.EMAIL_REQUIRED,
        password: MESSAGE.PASSWORD_REQUIRED,
        fullname: MESSAGE.FULLNAME_REQUIRED,
        gender: MESSAGE.GENDER_REQUIRED,
        phone: MESSAGE.PHONE_REQUIRED,
        role: MESSAGE.ROLE_REQUIRED,
      }
    }
  },
  response: baseSchema.response
};

const login = {
  summary: 'Đăng nhập',
  description: 'Đăng nhập',
  tags: ['Common (Tác vụ chung người dùng)'],
  response: baseSchema.response,
  body: {
    required: ['email', 'password'],
    type: 'object',
    additionalProperties: false,
type: 'object',
    properties: {
      email: {
        ...baseSchema.email,
        errorMessage: {
          _: MESSAGE.EMAIL_INVALID
        }
      },
      password: {
        ...baseSchema.password,
        errorMessage: {
          _: MESSAGE.PASSWORD_INVALID
        }
      },
    },
    errorMessage: {
      required: {
        email: MESSAGE.EMAIL_REQUIRED,
        password: MESSAGE.PASSWORD_REQUIRED,
      }
    }
  }
};

const checkLogin = {
  response: baseSchema.response
};

const changeProfile = {
  summary: 'Thay đổi thông tin cá nhân',
  description: 'Thay đổi thông tin cá nhân',
  tags: ['Common (Tác vụ chung người dùng)'],
  body: {
    type: 'object',
    additionalProperties: false,
type: 'object',
    // avatar not required salt in crypto
    properties: {
      fullname: {
        ...baseSchema.fullname,
        errorMessage: {
          _: MESSAGE.FULLNAME_INVALID
        }
      },
      gender: {
        ...baseSchema.gender,
        errorMessage: {
          _: MESSAGE.GENDER_INVALID
        }
      },
      avatar: {
        type: 'string',
        errorMessage: {
          _: MESSAGE.AVATAR_INVALID
        }
      },
      phone: {
        ...baseSchema.phone,
        errorMessage: {
          _: MESSAGE.PHONE_INVALID
        }
      }
    },
  },
  response: baseSchema.response
}

const changePassword = {
  summary: 'Thay đổi mật khẩu',
  description: 'Thay đổi mật khẩu',
  tags: ['Common (Tác vụ chung người dùng)'],
  body: {
    required: ['curPassword', 'newPassword'],
    type: 'object',
    additionalProperties: false,
type: 'object',
    // avatar not required salt in crypto
    properties: {
      curPassword: {
        ...baseSchema.password,
        errorMessage: {
          _: MESSAGE.PASSWORD_INVALID
        }
      },
      newPassword: {
        ...baseSchema.password,
        errorMessage: {
          _: MESSAGE.NEWPASSWORD_INVALID
        },

      },

    },
    errorMessage: {
      required: {
        curPassword: MESSAGE.PASSWORD_REQUIRED,
        newPassword: MESSAGE.NEWPASSWORD_REQUIRED,
      }
    },
  },
  response: baseSchema.response
}

const searchProduct = {
  summary: 'Tìm kiếm danh sách sản phẩm',
  description: 'Tìm kiếm danh sách sản phẩm',
  tags: ['Common (Tác vụ chung người dùng)'],
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
      },
      priceMax: {
        ...baseSchema.priceMax,
        errorMessage: {
          _: MESSAGE.MAX_PRICE_NOK,
        }
      },
      priceMin: {
        ...baseSchema.priceMin,
        errorMessage: {
          _: MESSAGE.MIN_PRICE_NOK,
        }
      },
      name: {
        ...baseSchema.name,
      },
    }
  }
}

const detailProduct = {
  summary: 'Xem chi tiết sản phẩm',
  description: 'Xem chi tiết sách sản phẩm',
  tags: ['Common (Tác vụ chung người dùng)'],
  response: baseSchema.response,
  params: {
    type: 'object',
    properties: {
      id: {
        ...baseSchema.id,
        errorMessage: {
          _: MESSAGE.ID_NOK,
        }
      }
    }
  }
}

const productInShop = {
  summary: 'Danh sách sản phẩm trong 1 gian hàng',
  description: 'Danh sách sản phẩm trong 1 gian hàng',
  tags: ['Common (Tác vụ chung người dùng)'],
  response: baseSchema.response,
  params: {
    type: 'object',
    properties: {
      idShop: {
        ...baseSchema.id,
        errorMessage: {
          _: MESSAGE.ID_NOK,
        }
      }
    }
  }
}

const productHot = {
  summary: 'Danh sách sản phẩm bán chạy',
  description: 'Danh sách sản phẩm bán chạy',
  tags: ['Common (Tác vụ chung người dùng)'],
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
      },
    }
  }
}

module.exports = {
  register,
  login,
  checkLogin,
  changeProfile,
  changePassword,
  searchProduct,
  detailProduct,
  productInShop,
  productHot,
}