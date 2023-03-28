const baseSchema = require("../schema/base");
const MESSAGE = require("../constant/message");

const register = {
  body: {
    required: ['email', 'password', 'fullname', 'gender', 'phone', 'avatar', 'role'],
    type: 'object',
    additionalProperties: false,
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
  response: baseSchema.response,
  body: {
    required: ['email', 'password'],
    type: 'object',
    additionalProperties: false,
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
  body: {
    type: 'object',
    additionalProperties: false,
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
  body: {
    required: ['curPassword', 'newPassword'],
    type: 'object',
    additionalProperties: false,
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
  response: baseSchema.response,
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
  response: baseSchema.response,
}

module.exports = {
  register,
  login,
  checkLogin,
  changeProfile,
  changePassword,
  searchProduct,
  detailProduct,
}