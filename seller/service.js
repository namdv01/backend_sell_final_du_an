const { v4 } = require('uuid');
const imageService = require('../base/image');
const { connectPg: pg } = require('../base/connectDb');
const MESSAGE = require('../constant/message');

const SellerService = {
  // product
  async createProduct(body) {
    const { name, quantity, price, idShop: id_shop, id_user, images, host } = body;
    const checkOwnerShop = await pg.from('shop').where({
      id: id_shop,
      id_user,
    }).first();
    if (!checkOwnerShop) {
      return {
        code: 400,
        message: MESSAGE.NOT_OWN_SHOP,
      }
    };
    let publicProduct = [];
    await pg.transaction(async (trx) => {
      const newProduct = await pg.from('product').returning('id').insert({
        name,
        quantity,
        price,
        id_shop,
        id: v4(),
      }).transacting(trx);
      if (images && images.length > 0) {
        images.forEach(async (image) => {
          if (!imageService.checkType(image) || imageService.sizeBase64(image) > 5) {
            await trx.rollback();
            throw new Error(MESSAGE.IMAGE_INVALID);
          }
        });
        publicProduct = images.map((image) => {
          return imageService.convertImage(image, 'product');
        });
        await pg.from('productImage').insert(publicProduct.map((pI) => ({
          id: v4(),
          id_product: newProduct[0].id,
          image: pI,
        }))).transacting(trx);
      }

    });
    return {
      code: 0,
      message: MESSAGE.CREATE_PRODUCT_SUCCESS,
      payload: {
        name,
        quantity,
        price,
        id_shop,
        images: publicProduct.map((pI) => `${host}/public/img/${pI}`),
      }
    }
  },

  async editProduct(body) {
    const { id_product, id_user, host, name, quantity, price, imagesAdd, imagesRemove } = body;
    const checkOwnProduct = await pg.from('product')
      .where('product.id', id_product)
      .join('shop', 'product.id_shop', 'shop.id')
      .where('shop.id_user', id_user)
      .first().select('shop.id');

    if (!checkOwnProduct) {
      return {
        code: 400,
        message: MESSAGE.NOT_OWN_PRODUCT,
      }
    }

    const formUpdate = {};
    if (name) {
      formUpdate.name = name;
    }
    if (quantity) {
      formUpdate.quantity = quantity;
    }
    if (price) {
      formUpdate.price = price;
    }
    let publicProduct = [];
    let newProduct = {};
    await pg.transaction(async (trx) => {
      newProduct = await pg.from('product').where('product.id', id_product)
        .update(formUpdate).returning('*').transacting(trx);

      if (imagesAdd && imagesAdd.length > 0) {
        imagesAdd.forEach(async (image) => {
          if (!imageService.checkType(image) || imageService.sizeBase64(image) > 5) {
            await trx.rollback();
            throw new Error(MESSAGE.IMAGE_INVALID);
          }
        });
        publicProduct = imagesAdd.map((image) => {
          return imageService.convertImage(image, 'product');
        });


        await pg.from('productImage').insert(publicProduct.map((pI) => ({
          id: v4(),
          id_product: newProduct[0].id,
          image: pI,
        }))).transacting(trx);
      }

      if (imagesRemove && imagesRemove.length > 0) {
        const fixList = imagesRemove.map((image) => image.split('public/img/')[1]);
        await pg.from('productImage').del().whereIn('image', fixList).transacting(trx);
        fixList.forEach((image) => {
          imageService.deleteImage(image);
        });
      }
    });
    // lấy toàn bộ ảnh sản phẩm hiện tại
    const curImage = await pg.from('productImage').where('id_product', id_product).select('image');
    newProduct[0].images = curImage.map((i) => `${host}/public/img/${i.image}`);
    return {
      code: 0,
      message: MESSAGE.EDIT_PRODUCT_SUCCESS,
      payload: newProduct,
    }

  },

  async delProduct(idUser, idProduct) {
    const checkOwn = await pg.from('product').where('id', idProduct)
      .join('shop', 'shop.id_user', idUser).select('shop.id').first();
    if (!checkOwn) {
      return {
        code: 0,
        message: MESSAGE.NOT_OWN_PRODUCT
      }
    }
    await pg.transaction(async (trx) => {
      await pg.from('product').where('id', idProduct).del().transacting(trx);
      await pg.from('cart').where('id_product', idProduct).del().transacting(trx);
      // không xóa trong đơn hàng và comment vì là nội dung liên quan đến buyer còn giỏ hàng thì bỏ được
      const oldImages = await pg.from('productImage').returning('image').where('id_product', idProduct).del().transacting(trx);
      oldImages.forEach((item) => {
        imageService.deleteImage(item.image);
      })
    });
    return {
      code: 0,
      message: MESSAGE
    }
  },

  async getProduct(idUser, idProduct) {
    const product = await pg.from('product')
      .where('id', idProduct)
      .join('shop', 'shop.id', 'product.id_shop')
      .where('shop.id_user', idUser).first();
    if (!product) {
      return {
        code: 400,
        message: MESSAGE.NOT_OWN_PRODUCT
      }
    }
    const productImage = await pg.from('productImage').where('id_product', idProduct)
      .select('image');
    product.images = productImage;
    return {
      code: 0,
      message: MESSAGE.SEARCH_PRODUCT_SUCCESS,
      payload: product,
    }
  },

  async getListProduct(idUser, query) {
    let { idShop, pageIndex, pageSize } = query;
    pageIndex = +pageIndex || 1;
    pageSize = +pageSize || 20;
    const shop = await pg.from('shop')
      .where({
        id: idShop,
        id_user: idUser
      }).first();

    if (!shop) {
      return {
        code: 400,
        message: MESSAGE.NOT_OWN_SHOP
      }
    }
    const ques = pg.from('product')
      .where('id_shop', idShop);
    const listProduct = await ques.clone()
      .limit(pageSize)
      .offset((pageIndex - 1) * pageSize);
    const totalProduct = await ques.count('*');
    const fixListIdProduct = listProduct.map((pro) => pro.id);
    const listImageProduct = await pg.from('productImage').whereIn('id_product', fixListIdProduct);
    listProduct = listProduct.map((pro) => {
      pro.images = listImageProduct.reduce((init, ima) => {
        if (ima.id === pro.id) {
          init.push(ima.image);
        }
        return init;
      }, []);
    });
    return {
      code: 0,
      message: MESSAGE.GET_LIST_PRODUCT_SUCCESS,
      payload: {
        products: listProduct,
        pageIndex,
        pageSize,
        totalPage: Math.ceil(+totalProduct.total / pageSize),
      },
    }
  },


  //shop
  async createShop(body) {
    const { name, id_user, address, logo } = body;
    const checkLimitShop = await pg.from('user').where({
      id: id_user
    }).count('numberShop').first();
    if (checkLimitShop.total <= 0) {
      return {
        code: 400,
        message: MESSAGE.LIMIT_CREATE_SHOP
      }
    }

    if (!imageService.checkType(logo) || imageService.sizeBase64(logo) > 5) {
      throw new Error(MESSAGE.AVATAR_INVALID);
    }

    const publicLogo = imageService.convertImage(logo, 'logo');
    const id = v4();
    const dataSave = {
      name,
      id_user,
      address,
      logo: publicLogo,
      id,
    }
    await pg.from('shop').insert(dataSave);
    return {
      code: 0,
      message: MESSAGE.CREATE_SHOP_SUCCESS,
    }
  },

  async editShop(body) {
    const { id_shop, id_user, host, ...rest } = body;
    const ques = pg.from('shop').where({
      id: id_shop,
      id_user,
    });
    const shop = await ques.clone().first();
    if (!shop) {
      return {
        code: 0,
        message: MESSAGE.NOT_OWN_SHOP,
      }
    }
    let newLogo = '';
    if (rest.logo) {
      if (!imageService.checkType(rest.logo) || imageService.sizeBase64(rest.logo) > 5) {
        await trx.rollback();
        throw new Error(MESSAGE.IMAGE_INVALID);
      }
      newLogo = imageService.convertImage(rest.logo);
      rest.logo = newLogo;
      imageService.deleteImage(shop.logo);
    }
    const newShop = await ques.update(rest).returning('*');
    newShop.logo = `${host}/public/img/${newLogo || shop.logo}`;
    return {
      code: 0,
      message: MESSAGE.EDIT_SHOP_SUCCESS,
      payload: newShop,
    }
  },

  async delShop(idUser, idShop) {
    const shop = await pg.from('shop').where({
      id: idShop,
      id_user: idUser
    }).first();

    if (!shop) {
      return {
        code: 400,
        message: MESSAGE.NOT_OWN_SHOP,
      }
    }

    await pg.transaction(async (trx) => {
      // chỉ xóa sản phẩm ko xóa đơn hàng
      await pg.from('shop').where({ id: idShop }).del().transacting(trx);
      const oldProduct = await pg.from('product').where('id_shop', idShop).del().returning('id').transacting(trx);
      const fixIdProduct = oldProduct.map((pro) => pro.id);
      await pg.from('productImage').whereIn('id_product', fixIdProduct).transacting(trx);
    });
    return {
      code: 0,
      message: MESSAGE.DEL_SHOP_SUCCESS,
    }
  },

  async getListShop(query) {
    let { id_user, host, pageIndex, pageSize } = query;
    pageSize = +pageSize || 20;
    pageIndex = +pageIndex || 1;
    const ques = pg.from('shop').where('id_user', id_user);
    const totalShop = await ques.clone().count().first();
    const shop = await ques.limit(pageSize).offset((pageIndex - 1) * pageSize);
    const fixShop = shop.map((i) => ({
      ...i,
      logo: `${host}/public/img/${i.logo}`,
    }));
    return {
      code: 0,
      message: MESSAGE.SEARCH_PRODUCT_SUCCESS,
      payload: {
        shop: fixShop,
        pageIndex,
        pageSize,
        totalPage: Math.ceil(+totalShop.total / pageSize),
      }
    }
  },

  // order
  async editOrder(query) {
    const { idOrder, idUser, status, payment } = query;
    const order = await pg.from('order')
      .join('orderDetail', 'order.id', 'orderDetail.id_order')
      .where('order.id', idOrder)
      .join('product', 'product.id', 'orderDetail.id_product')
      .join('shop', 'shop.id', 'product.id_shop')
      .andWhere('shop.id_user', idUser).first();
    if (!order) {
      return {
        code: 400,
        message: MESSAGE.NOT_OWN_ORDER
      }
    }
    const formUpdate = {};
    if (status) {
      formUpdate.status = status;
    }
    if (payment !== undefined) {
      formUpdate.payment = !!payment;
    }
    await pg.from('order').update(formUpdate).where('id', idOrder);

    return {
      code: 0,
      message: MESSAGE.EDIT_ORDER_SUCCESS
    }
  },

  async getOrder(query) {
    const { idUser, idOrder } = query;
    const order = await pg.from('order')
      .join('orderDetail', 'order.id', 'orderDetail.id_order')
      .where('order.id', idOrder)
      .join('product', 'product.id', 'orderDetail.id_product')
      .join('shop', 'shop.id', 'product.id_shop')
      .andWhere('shop.id_user', idUser)
      .select({
        id: 'order.id',
        id_buyer: 'order.id_buyer',
        status: 'order.status',
        date: 'order.date',
        payment: 'order.payment',
      }).first();

    if (!order) {
      return {
        code: 400,
        message: MESSAGE.NOT_OWN_ORDER
      }
    }
    const detailOrder = await pg.from('orderDetail').where('id_order', idOrder)
      .join('product', 'product.id', 'orderDetail.id_product')
      .select({
        'name': 'product.name',
        'quantity': 'orderDetail.quantity',
        'price': 'orderDetail.price',
      });
    order.detail = detailOrder;
    return {
      code: 0,
      message: MESSAGE.GET_ORDER_SUCCESS,
      payload: order,
    }
  },

  async getListOrder(query) {
    let { idUser, idShop, pageIndex, pageSize } = query;
    pageIndex = +pageIndex || 1;
    pageSize = +pageSize || 20;
    const checkOwn = await pg.from('shop').where({
      id: idShop,
      id_user: idUser
    }).first();
    if (!checkOwn) {
      return {
        code: 400,
        message: MESSAGE.NOT_OWN_SHOP
      }
    }

    const ques = pg.from('order');
    const totalOrder = await ques.clone().count('*').first();

    const orders = await ques
      .limit(pageSize)
    offset((pageIndex - 1) * pageSize);

    const listIdOrder = orders.map((i) => i.id);
    const detailOrders = await pg.from('orderDetail')
      .whereIn('id_order', listIdOrder)
      .join('product', 'product.id', 'orderDetail.id_product')
      .select({
        'id_order': 'orderDetail.id',
        'name': 'product.name',
        'quantity': 'orderDetail.quantity',
        'price': 'orderDetail.price',
      });
    const fixOrder = orders.map((o) => {
      o.detail = detailOrders.reduce((init, de) => {
        if (de.id_order === o.id) {
          init.push({
            name: de.name,
            quantity: de.quantity,
            price: de.price
          })
        }
        return init;
      }, []);
      return o;
    });

    return {
      code: 0,
      message: MESSAGE.GET_LST_ORDER_SUCCESS,
      payload: {
        orders: fixOrder,
        pageSize,
        pageIndex,
        totalPage: Math.ceil(+totalOrder.total / pageSize)
      }
    }
  },
}

module.exports = SellerService;