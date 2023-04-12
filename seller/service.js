const { v4 } = require('uuid');
const imageService = require('../base/image');
const { connectPg: pg } = require('../base/connectDb');
const MESSAGE = require('../constant/message');
const cloudinary = require('../base/cloudinary');

const SellerService = {
  // product
  async createProduct(body) {
    const { name, quantity, price, idShop: id_shop, id_user, images } = body;
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
    const trx = await pg.transaction();
    const newProduct = await trx.from('product').insert({
      name,
      quantity,
      price,
      id_shop,
      id: v4()
    }).returning('*');
    if (images && images.length > 0) {
      images.forEach((i) => {
        if (!imageService.checkType(i) || imageService.sizeBase64(i) > 5) {
          throw new Error(MESSAGE.IMAGE_INVALID);
        }
      });
      const arrUpload = images.map((i) =>
        cloudinary.uploader.upload(i, {
          folder: '/sale_final/product'
        }));
      const listImage = await Promise.all(arrUpload);
      publicProduct = await trx('productImage').insert(listImage.map((li) => ({
        id: v4(),
        id_product: newProduct[0].id,
        image: li.secure_url,
      }))).returning('image');
    }
    await trx.commit();

    // await pg.transaction(async (trx) => {
    //   const newProduct = await pg.from('product').returning('id').insert({
    //     name,
    //     quantity,
    //     price,
    //     id_shop,
    //     id: v4(),
    //   }).transacting(trx);
    //   if (images && images.length > 0) {
    //     images.forEach(async (image) => {
    //       if (!imageService.checkType(image) || imageService.sizeBase64(image) > 5) {
    //         throw new Error(MESSAGE.IMAGE_INVALID);
    //       }
    //     });
    //     publicProduct = images.map((image) => {
    //       return imageService.convertImage(image, 'product');
    //     });
    //     await pg.from('productImage').insert(publicProduct.map((pI) => ({
    //       id: v4(),
    //       id_product: newProduct[0].id,
    //       image: pI,
    //     }))).transacting(trx);
    //   }

    // });
    return {
      code: 0,
      message: MESSAGE.CREATE_PRODUCT_SUCCESS,
      payload: {
        ...newProduct[0],
        images: publicProduct.map((pp) => pp.image)
        // images: publicProduct.map((pI) => `${host}/tmp/img/${pI}`),
      }
    }
  },

  async editProduct(body) {
    const { id_product, id_user, name, quantity, price, imagesAdd, imagesRemove } = body;
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
    let publicImageProduct = [];
    let newProduct = {};
    const trx = await pg.transaction();
    newProduct = await trx('product').update(formUpdate).where('product.id', id_product).returning('*');
    if (imagesAdd && imagesAdd.length > 0) {
      imagesAdd.forEach(i => {
        if (!imageService.checkType(i) || imageService.sizeBase64(i) > 5) {
          throw new Error(MESSAGE.IMAGE_INVALID);
        }
      });
      const uploadImage = imagesAdd.map((i) => cloudinary.uploader.upload(i, {
        folder: '/sale_final/product/'
      }));
      publicImageProduct = await Promise.all(uploadImage);
      await trx('productImage').insert(publicImageProduct.map((pIP) => ({
        id: v4(),
        image: pIP.secure_url,
        id_product: id_product
      })));
    }
    if (imagesRemove && imagesRemove.length > 0) {
      await trx('productImage').del().whereIn('image', imagesRemove).andWhere('id_product', id_product);
      const delImage = imagesRemove.map((i) => {
        const public_id = i.split('/').splice(-1)[0].slice(0, -4);
        return cloudinary.uploader.destroy('sale_final/product/' + public_id);
      });
      await Promise.all(delImage);
    }
    await trx.commit();

    // await pg.transaction(async (trx) => {
    //   newProduct = await pg.from('product').where('product.id', id_product)
    //     .update(formUpdate).returning('*').first().transacting(trx);

    //   if (imagesAdd && imagesAdd.length > 0) {
    //     imagesAdd.forEach(async (image) => {
    //       if (!imageService.checkType(image) || imageService.sizeBase64(image) > 5) {
    //         throw new Error(MESSAGE.IMAGE_INVALID);
    //       }
    //     });
    //     publicProduct = imagesAdd.map((image) => {
    //       return imageService.convertImage(image, 'product');
    //     });


    //     await pg.from('productImage').insert(publicProduct.map((pI) => ({
    //       id: v4(),
    //       id_product: newProduct[0].id,
    //       image: pI,
    //     }))).transacting(trx);
    //   }

    //   if (imagesRemove && imagesRemove.length > 0) {
    //     const fixList = imagesRemove.map((image) => image.split('public/img/')[1]);
    //     await pg.from('productImage').del().whereIn('image', fixList).transacting(trx);
    //     fixList.forEach((image) => {
    //       imageService.deleteImage(image);
    //     });
    //   }
    // });
    // // lấy toàn bộ ảnh sản phẩm hiện tại
    // const curImage = await pg.from('productImage').where('id_product', id_product).select('image');
    // newProduct[0].images = curImage.map((i) => `${host}/tmp/img/${i.image}`);
    return {
      code: 0,
      message: MESSAGE.EDIT_PRODUCT_SUCCESS,
    }

  },

  async delProduct(idUser, idProduct) {
    const checkOwn = await pg.from('product').where('product.id', idProduct)
      .join('shop', 'shop.id', 'product.id_shop')
      .where('shop.id_user', idUser).select('*').first();
    if (!checkOwn) {
      return {
        code: 0,
        message: MESSAGE.NOT_OWN_PRODUCT
      }
    }
    const trx = await pg.transaction();
    await pg('product').where('id', idProduct).del();
    await trx('cart').where('id_product', idProduct).del();
    const listImage = await trx('productImage').where('id_product', idProduct).del().returning('image');
    const delImage = listImage((li) => {
      const public_id = li.image.split('/').splice(-1)[0].slice(0, -4);
      return cloudinary.uploader.destroy('sale_final/product' + public_id);
    });
    await Promise.all(delImage);
    await trx.commit();
    // await pg.transaction(async (trx) => {
    //   await pg.from('product').where('id', idProduct).del().transacting(trx);
    //   await pg.from('cart').where('id_product', idProduct).del().transacting(trx);
    //   // không xóa trong đơn hàng và comment vì là nội dung liên quan đến buyer còn giỏ hàng thì bỏ được
    //   const oldImages = await pg.from('productImage').returning('image').where('id_product', idProduct).del().transacting(trx);
    //   oldImages.forEach((item) => {
    //     imageService.deleteImage(item.image);
    //   })
    // });
    return {
      code: 0,
      message: MESSAGE.DEL_PRODUCT_SUCCESS,
    }
  },

  async getProduct(query) {
    const { idUser, idProduct } = query;
    const product = await pg.from('product')
      .where('product.id', idProduct)
      .join('shop', 'shop.id', 'product.id_shop')
      .where('shop.id_user', idUser).first()
      .select('address', 'quantity', 'price', 'id_shop', 'logo');
    if (!product) {
      return {
        code: 400,
        message: MESSAGE.NOT_OWN_PRODUCT
      }
    }
    const productImage = await pg.from('productImage').where('id_product', idProduct)
      .select('image');
    product.images = productImage.map((i) => i.image);
    return {
      code: 0,
      message: MESSAGE.SEARCH_PRODUCT_SUCCESS,
      payload: product,
    }
  },

  async getListProduct(query) {
    let { idShop, pageIndex, pageSize, idUser } = query;
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
    let listProduct = await ques.clone()
      .limit(pageSize)
      .offset((pageIndex - 1) * pageSize);
    const totalProduct = await ques.count('*').first();
    const fixListIdProduct = listProduct.map((pro) => pro.id);
    const listImageProduct = await pg.from('productImage').whereIn('id_product', fixListIdProduct);
    listProduct = listProduct.map((pro) => {
      pro.images = listImageProduct.reduce((init, ima) => {
        if (ima.id_product === pro.id) {
          init.push(ima.image);
        }
        return init;
      }, []);
      return pro;
    });
    return {
      code: 0,
      message: MESSAGE.GET_LIST_PRODUCT_SUCCESS,
      payload: {
        products: listProduct,
        pageIndex,
        pageSize,
        totalPage: Math.ceil(+totalProduct.count / pageSize),
      },
    }
  },


  //shop
  async createShop(body) {
    const { name, id_user, address, logo } = body;
    const checkLimitShop = await pg.from('user').where({
      id: id_user
    }).count('numberShop').first();
    if (checkLimitShop.count <= 0) {
      return {
        code: 400,
        message: MESSAGE.LIMIT_CREATE_SHOP
      }
    }

    if (!imageService.checkType(logo) || imageService.sizeBase64(logo) > 5) {
      throw new Error(MESSAGE.AVATAR_INVALID);
    }
    const save_logo = await cloudinary.uploader.upload(logo, {
      folder: '/sale_final/logo',
    })
    // const publicLogo = imageService.convertImage(logo, 'logo');
    const id = v4();
    const dataSave = {
      name,
      id_user,
      address,
      logo: save_logo.secure_url,
      id,
    }
    const trx = await pg.transaction();
    const saveShop = await trx('shop').insert(dataSave).returning('*');
    await trx('user').decrement('numberShop', 1).where({ id: id_user });
    await trx.commit();
    return {
      code: 0,
      message: MESSAGE.CREATE_SHOP_SUCCESS,
      payload: saveShop[0]
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
        throw new Error(MESSAGE.IMAGE_INVALID);
      }
      // newLogo = imageService.convertImage(rest.logo);
      // rest.logo = newLogo;
      // imageService.deleteImage(shop.logo);
      newLogo = await cloudinary.uploader.upload(rest.logo, {
        folder: '/sale_final/logo',
      });
      const public_id = shop.logo.split('/').splice(-1)[0].slice(0, -4);
      rest.logo = newLogo.secure_url;
      await cloudinary.uploader.destroy('sale_final/logo/' + public_id);
    }
    const newShop = await ques.update(rest).returning('*');
    return {
      code: 0,
      message: MESSAGE.EDIT_SHOP_SUCCESS,
      payload: newShop[0],
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

    // await pg.transaction(async (trx) => {
    //   // chỉ xóa sản phẩm ko xóa đơn hàng
    //   await pg.from('shop').where({ id: idShop }).del().transacting(trx);
    //   const public_logo = shop.logo.split('/').splice(-1)[0].slice(0, -4);
    //   await cloudinary.uploader.destroy('sale_final/logo/' + public_logo);
    //   const oldProduct = await pg.from('product').where('id_shop', idShop).del().returning('id').transacting(trx);
    //   const fixIdProduct = oldProduct.map((pro) => pro.id);
    //   const oldImage = await pg.from('productImage').whereIn('id_product', fixIdProduct).returning('image').transacting(trx);
    //   await Promise.all(oldImage.map((item) => {
    //     const public_id = item.image.split('/').splice(-1)[0].slice(0, -4);
    //     return cloudinary.uploader.destroy('sale_final/product/' + public_id);
    //   }))
    // });
    const trx = await pg.transaction();
    await trx('shop').where({ id: idShop }).del();
    const oldProduct = await trx('product').where('id_shop', idShop).del().returning('id');
    await trx('cart').whereIn('id_product', oldProduct.map((o) => o.id)).del();
    const oldImage = await trx('productImage').whereIn('id_product', oldProduct.map((o) => o.id)).returning('image');
    const public_logo = shop.logo.split('/').splice(-1)[0].slice(0, -4);
    await cloudinary.uploader.destroy('sale_final/logo/' + public_logo);
    const delImage = oldImage.map((o) => {
      const public_id = o.image.split('/').splice(-1)[0].slice(0, -4);
      return cloudinary.uploader.destroy('sale_final/product/' + public_id);
    });
    await Promise.all(delImage);
    await trx.commit();
    return {
      code: 0,
      message: MESSAGE.DEL_SHOP_SUCCESS,
    }
  },

  async getListShop(query) {
    let { id_user, pageIndex, pageSize } = query;
    pageSize = +pageSize || 20;
    pageIndex = +pageIndex || 1;
    const ques = pg.from('shop').where('id_user', id_user);
    const totalShop = await ques.clone().count().first();
    const shop = await ques.limit(pageSize).offset((pageIndex - 1) * pageSize);
    return {
      code: 0,
      message: MESSAGE.SEARCH_OWN_SHOP_SUCCESS,
      payload: {
        shop,
        pageIndex,
        pageSize,
        totalPage: Math.ceil(+totalShop.count / pageSize),
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
      .offset((pageIndex - 1) * pageSize);

    const listIdOrder = orders.map((i) => i.id);
    const detailOrders = await pg.from('orderDetail')
      .whereIn('id_order', listIdOrder)
      .join('product', 'product.id', 'orderDetail.id_product')
      .select({
        'id_order': 'orderDetail.id_order',
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
        totalPage: Math.ceil(+totalOrder.count / pageSize)
      }
    }
  },
}

module.exports = SellerService;