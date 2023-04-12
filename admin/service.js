const { connectPg: pg } = require('../base/connectDb');
const { PAGINATION } = require('../constant');
const MESSAGE = require('../constant/message');
const passwordService = require('../base/password');
const imageService = require('../base/image');
const cloudinary = require('../base/cloudinary');
const { v4 } = require('uuid');

const AdminService = {
  async getListUser(query) {
    let { id, role, pageSize, pageIndex } = query;
    const ques = pg('user');
    let lstUser;
    if (id) {
      lstUser = await ques.clone().where({ id }).first()
        .select('id', 'email', 'fullname', 'phone', 'avatar', 'gender', 'role', 'numberShop');
      if (!lstUser) {
        throw new Error(MESSAGE.ID_NOK);
      }
      return {
        code: 0,
        message: MESSAGE.GET_LIST_USER_SUCCESS,
        payload: lstUser
      }
    }
    if (role) {
      ques.where({ role });
    }
    pageSize = +pageSize || PAGINATION.SIZE;
    pageIndex = +pageIndex || PAGINATION.INDEX;
    const totalUser = await ques.clone().count('*').first();
    lstUser = await ques.limit(pageSize).offset((pageIndex - 1) * pageSize)
      .select('id', 'email', 'fullname', 'phone', 'avatar', 'gender', 'role', 'numberShop');
    return {
      code: 0,
      message: MESSAGE.GET_LIST_USER_SUCCESS,
      payload: {
        users: lstUser,
        pageSize,
        pageIndex,
        totalPage: Math.ceil(+totalUser.count / pageSize),
      }
    }
  },

  async getListShop(query) {
    let { id, idUser, pageIndex, pageSize } = query;
    const ques = pg('shop');
    let lstShop;
    if (id) {
      lstShop = await ques.where({ id }).first();
      if (!lstShop) {
        throw new Error(MESSAGE.ID_NOK);
      }
      return {
        code: 0,
        message: MESSAGE.GET_LIST_SHOP_SUCCESS,
        payload: lstShop,
      }
    }
    if (idUser) {
      ques.where({ id_user: idUser });
    }
    const totalShop = await ques.clone().count('*').first();
    pageSize = +pageSize || PAGINATION.SIZE;
    pageIndex = +pageIndex || PAGINATION.INDEX;
    lstShop = await ques.limit(pageSize).offset((pageIndex - 1) * pageSize);
    return {
      code: 0,
      message: MESSAGE.GET_LIST_SHOP_SUCCESS,
      payload: {
        shops: lstShop,
        pageIndex,
        pageSize,
        totalPage: Math.ceil(+totalShop.count / pageSize),
      }
    }
  },

  async getListProduct(query) {
    let { id, idShop, pageIndex, pageSize } = query;
    const ques = pg('product');
    let lstProduct;
    let lstImage;
    if (id) {
      lstProduct = await ques.where({ id }).first();
      if (!lstProduct) {
        throw new Error(MESSAGE.ID_NOK);
      }
      lstImage = await pg.from('productImage').where({ id_product: id }).select('image');
      lstImage = lstImage.map((image) => `${host}/tmp/img/${image.image}`);
      lstProduct.images = lstImage;
      return {
        code: 0,
        message: MESSAGE.GET_LIST_PRODUCT_SUCCESS,
        payload: lstProduct,
      }
    }
    if (idShop) {
      ques.where({ id_shop: idShop });
    }
    const totalProduct = await ques.clone().count('*').first();
    pageSize = +pageSize || PAGINATION.SIZE;
    pageIndex = +pageIndex || PAGINATION.INDEX;
    lstProduct = await ques().limit(pageSize).offset((pageIndex - 1) * pageSize);
    const lstIdProduct = lstProduct.map((pro) => pro.id);
    lstImage = await pg.from('productImage').whereIn('id_product', lstIdProduct).select('image', 'id_product');
    lstProduct = lstProduct.map((pro) => {
      pro.images = lstImage.reduce((init, im) => {
        if (im.id_product === pro.id) {
          init.push(im.image);
        }
        return init;
      }, []);
      return pro;
    });
    return {
      code: 0,
      message: MESSAGE.GET_LIST_PRODUCT_SUCCESS,
      payload: {
        products: lstProduct,
        pageSize,
        pageIndex,
        totalPage: Math.ceil(+totalProduct.count / pageSize),
      }
    }
  },

  async getListOrder(query) {
    let { id, idBuyer, status, payment, pageIndex, pageSize } = query;
    let listOrder;
    let detailOrder;
    const ques = pg.from('order');
    if (id) {
      listOrder = await ques.where({ id }).first();
      if (!listOrder) {
        throw new Error(MESSAGE.ID_NOK);
      }
      detailOrder = await pg.from('orderDetail').where({ id_order: id })
        .join('product', 'product.id', 'orderDetail.id_product')
        .select({
          id: 'orderDetail.id',
          name: 'product.name',
          price: 'orderDetail.price',
          quantity: 'orderDetail.quantity',
        });
      listOrder.detail = detailOrder;
      return {
        code: 0,
        message: MESSAGE.GET_LIST_ORDER_SUCCESS,
        payload: detailOrder,
      }
    }
    if (idBuyer) {
      ques.where('id_buyer', idBuyer);
    }
    if (status) {
      ques.where('status', status);
    }
    if (payment) {
      ques.where('payment', payment);
    }
    const totalOrder = await ques.clone().count('*').first();
    pageSize = +pageSize || PAGINATION.SIZE;
    pageIndex = +pageIndex || PAGINATION.INDEX;
    listOrder = await ques.limit(pageSize).offset((pageIndex - 1) * pageSize);
    const listIdOrder = listOrder.map((lo) => lo.id);
    detailOrder = await pg.from('orderDetail').whereIn('id_order', listIdOrder)
      .join('product', 'product.id', 'orderDetail.id_product')
      .select({
        id: 'orderDetail.id',
        id_order: 'orderDetail.id_order',
        name: 'product.name',
        price: 'orderDetail.price',
        quantity: 'orderDetail.quantity',
      });
    listOrder = listOrder.map((lo) => {
      lo.detail = detailOrder.reduce((init, de) => {
        if (de.id_order === lo.id) {
          const { id_order, ...rest } = de;
          init.push(rest);
        }
        return init;
      }, []);
      return lo;
    });

    return {
      code: 0,
      message: MESSAGE.GET_LIST_ORDER_SUCCESS,
      payload: {
        orders: listOrder,
        pageSize,
        pageIndex,
        totalPage: Math.ceil(+totalOrder.count / pageSize),
      }
    }
  },

  async getListComment(query) {
    let { idOrder, idProduct, star, pageIndex, pageSize } = query;
    const ques = pg.from('comment');
    if (idOrder) {
      ques.where('id_order', idOrder);
    }
    if (idProduct) {
      ques.where('id_product', idProduct);
    }
    if (star) {
      ques.where('star', star);
    }
    const totalComment = await ques.clone().count('*').first();
    pageIndex = +pageIndex || PAGINATION.INDEX;
    pageSize = +pageSize || PAGINATION.SIZE;
    let comments = await ques.limit(pageSize).offset((pageIndex - 1) * pageSize);
    const listIdOrder = orders.map((o) => o.id_order);
    const orders = await pg.from('order').whereIn('id', listIdOrder)
      .join('orderDetail', 'orderDetail.id_order', 'order.id')
      .join('user', 'user.id', 'order.id_buyer')
      .select({
        name: 'user.fullname',
        id_orderDetail: 'orderDetail.id',
        id_order: 'order.id',
        id_product: 'orderDetail.id_product',
      });
    comments = comments.map((co) => {
      co.orderDetail = orders.reduce((init, item) => {
        if (item.id_order === co.id_order && item.id_product === co.id_product) {
          init.push(item);
        }
        return init;
      }, []);
      return co;
    });
    return {
      code: 0,
      message: MESSAGE.GET_LIST_COMMENT_SUCCESS,
      payload: {
        comments: comments,
        pageIndex,
        pageSize,
        totalPage: Math.ceil(+totalComment.count / pageSize),
      }
    }
  },

  async editUser(body) {
    const { fullname, gender, avatar, numberShop, password, idUser, phone } = body;
    const ques = pg.from('user').where({ id: idUser });
    const checkAdmin = await ques.clone().first();
    if (checkAdmin.role === 'admin') {
      throw new Error(MESSAGE.NOT_UPDATE_ACCEPT);
    }
    const formUpdate = {};
    if (fullname) {
      formUpdate.fullname = fullname;
    }
    if (gender) {
      formUpdate.gender = gender;
    }
    if (phone) {
      formUpdate.phone = phone;
    }
    if (numberShop) {
      if (checkAdmin.role !== 'seller') {
        throw new Error(MESSAGE.NOT_UPDATE_ACCEPT);
      }
      formUpdate.numberShop = numberShop;
    }
    if (password) {
      formUpdate.password = passwordService.hash(password);
    }
    if (avatar) {
      if (!imageService.checkType(avatar) || imageService.sizeBase64(avatar) > 5) {
        throw new Error(MESSAGE.AVATAR_INVALID);
      }
      const imageAvatar = await cloudinary.uploader.upload(avatar, {
        folder: '/sale_final/avatar'
      });
      formUpdate.avatar = imageAvatar.secure_url;
      // formUpdate.avatar = imageService.convertImage(avatar, 'avatar');
      // imageService.deleteImage(checkAdmin.avatar);
    }
    const updateUser = await ques.update(formUpdate).returning('*');
    if (avatar) {
      const public_id = checkAdmin.split('/').splice(-1)[0].slice(0, -4);
      await cloudinary.uploader.destroy('sale_final/product/' + public_id);
    }
    const { password: newPassword, ...rest } = updateUser[0];
    return {
      code: 0,
      message: MESSAGE.UPDATE_PROFILE_SUCCESS,
      payload: rest,
    }
  },

  async editShop(body) {
    const { idShop, name, logo, address } = body;
    const ques = pg.from('shop').where({ id: idShop });
    const checkShop = await ques.first();
    if (!checkShop) {
      throw new Error(MESSAGE.ID_NOK);
    }
    const formUpdate = {};
    if (name) {
      formUpdate.name = name;
    }
    if (address) {
      formUpdate.address = address;
    }
    if (logo) {
      if (!imageService.checkType(logo) || imageService.sizeBase64(logo) > 5) {
        throw new Error(MESSAGE.AVATAR_INVALID);
      }
      const newLogo = await cloudinary.uploader.upload(logo, {
        folder: '/sale_final/logo',
      });
      const old_public_id = checkShop.logo.split('/').splice(-1)[0].slice(0, -4);
      await cloudinary.uploader.destroy('sale_final/logo/' + old_public_id);
      formUpdate.logo = newLogo.secure_url;
      // formUpdate.logo = imageService.convertImage(logo, 'avatar');
      // imageService.deleteImage(checkShop.logo);
    }
    const updateShop = await ques.update(formUpdate).returning('*');
    return {
      code: 0,
      message: MESSAGE.EDIT_SHOP_SUCCESS,
      payload: updateShop[0],
    }
  },

  async editOrder(body) {
    const { idOrder, status, payment } = body;
    const ques = pg.from('order').where({ id: idOrder });
    const checkOrder = await ques.clone().first();
    if (!checkOrder) {
      throw new Error(MESSAGE.ID_NOK);
    }
    const formUpdate = {};
    if (status) {
      if (checkOrder.status === 'cancel' || checkOrder.status === 'done') {
        return {
          code: 400,
          message: MESSAGE.EDIT_ORDER_FAIL,
        }
      }
      formUpdate.status = status;
    }
    if (payment) {
      if (checkOrder.payment) {
        return {
          code: 400,
          message: MESSAGE.EDIT_ORDER_FAIL
        }
      }
      formUpdate.payment = payment;
    }
    const updateOrder = await ques.update(formUpdate).returing('*').first();
    return {
      code: 0,
      message: MESSAGE.EDIT_ORDER_SUCCESS,
      payload: updateOrder,
    }

  },

  async editProduct(body) {
    const { idProduct, name, quantity, price, imagesAdd, imagesRemove } = body;
    const ques = pg.from('product').where({ id: idProduct });
    const checkProduct = await ques.clone().first();
    if (!checkProduct) {
      throw new Error(MESSAGE.ID_NOK);
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
    const trx = await pg.transaction();
    await ques.update(formUpdate).transacting(trx);
    if (imagesAdd && imagesAdd.length > 0) {
      imagesAdd.forEach((i) => {
        if (!imageService.checkType(i) || imageService.sizeBase64(i) > 5) {
          throw new Error(MESSAGE.IMAGE_INVALID);
        }
      });
      const uploadImage = imagesAdd.map((i) => cloudinary.uploader.upload(i, {
        folder: '/sale_final/product'
      }));
      const listI = await Promise.all(uploadImage);
      await trx('productImage').insert(listI.map((u) => ({
        id: v4(),
        image: u.secure_url,
        id_product: idProduct
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
    //   updateProduct = await ques.update(formUpdate).returing('*').first().transacting(trx);
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
    //       id_product: updateProduct.id,
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
    // const curImage = await pg.from('productImage').where('id_product', idProduct).select('image');
    // newProduct[0].images = curImage.map((i) => `${host}/tmp/img/${i.image}`);
    return {
      code: 0,
      message: MESSAGE.EDIT_PRODUCT_SUCCESS,
    }
  },

  async createShop(body) {
    const { name, idUser, address, logo } = body;
    const checkLimitShop = await pg('user').where({
      id: idUser,
      role: 'seller'
    }).first();
    if (checkLimitShop.numberShop <= 0) {
      return {
        code: 400,
        message: MESSAGE.LIMIT_CREATE_SHOP
      }
    }
    const trx = await pg.transaction();
    if (!imageService.checkType(logo) || imageService.sizeBase64(logo) > 5) {
      throw new Error(MESSAGE.AVATAR_INVALID);
    }
    const publicLogo = await cloudinary.uploader.upload(logo, {
      folder: '/sale_final/logo'
    })
    // const publicLogo = imageService.convertImage(logo, 'logo');
    const dataSave = {
      name,
      id_user: idUser,
      address,
      logo: publicLogo.secure_url,
      id: v4(),
    }
    const saveShop = await trx('shop').insert(dataSave).returning('*');
    await trx('user').where('id', idUser).decrement('numberShop', 1);
    await trx.commit();
    return {
      code: 0,
      message: MESSAGE.CREATE_SHOP_SUCCESS,
      payload: saveShop[0]
    }
  },

  async createProduct(body) {
    const { name, quantity, price, idShop, idUser, images } = body;
    const checkOwnerShop = await pg.from('shop').where({
      id: idShop,
    }).first();
    if (!checkOwnerShop) {
      return {
        code: 400,
        message: MESSAGE.NOT_OWN_SHOP,
      }
    };
    let publicProduct = [];
    const trx = await pg.transaction();
    const newProduct = await trx('product').insert({
      name, quantity, id_shop: idShop, id: v4(), price
    }).returning('*');
    if (images && images.length > 0) {
      images.forEach((i) => {
        if (!imageService.checkType(i) || imageService.sizeBase64(i) > 5) {
          throw new Error(MESSAGE.IMAGE_INVALID);
        }
      });
      const uploadImage = images.map((i) => cloudinary.uploader.upload(i, {
        folder: '/sale_final/product'
      }))
      publicProduct = await Promise.all(uploadImage);
      await trx('productImage').insert(publicProduct.map((pP) => ({
        id: v4(),
        image: pP.secure_url,
        id_product: newProduct[0].id
      })));
    }
    await trx.commit();


    // await pg.transaction(async (trx) => {
    //   const newProduct = await pg.from('product').returning('id').insert({
    //     name,
    //     quantity,
    //     price,
    //     id_shop: idShop,
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
        name,
        quantity,
        price,
        idShop,
        idUser,
        images: publicProduct.map((pI) => pI.secure_url),
      }
    }
  },

  async delShop(idShop) {
    const shop = await pg.from('shop').where({
      id: idShop,
    }).first();

    if (!shop) {
      return {
        code: 400,
        message: MESSAGE.ID_NOK,
      }
    }

    // await pg.transaction(async (trx) => {
    //   // chỉ xóa sản phẩm ko xóa đơn hàng
    //   await pg.from('shop').where({ id: idShop }).del().transacting(trx);
    //   const oldProduct = await pg.from('product').where('id_shop', idShop).del().returning('id').transacting(trx);
    //   const fixIdProduct = oldProduct.map((pro) => pro.id);
    //   await pg.from('productImage').whereIn('id_product', fixIdProduct).transacting(trx);
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

  async delProduct(idProduct) {
    const checkOwn = await pg.from('product').where('id', idProduct).first();
    if (!checkOwn) {
      return {
        code: 0,
        message: MESSAGE.ID_NOK
      }
    }
    // await pg.transaction(async (trx) => {
    //   await pg.from('product').where('id', idProduct).del().transacting(trx);
    //   await pg.from('cart').where('id_product', idProduct).del().transacting(trx);
    //   // không xóa trong đơn hàng và comment vì là nội dung liên quan đến buyer còn giỏ hàng thì bỏ được
    //   const oldImages = await pg.from('productImage').returning('image').where('id_product', idProduct).del().transacting(trx);
    //   oldImages.forEach((item) => {
    //     imageService.deleteImage(item.image);
    //   })
    // });
    const trx = await pg.transaction();
    await trx('product').where('id', idProduct).del();
    await trx('cart').where('id_product', idProduct).del();
    const oldImage = await trx('productImage').where('id_product', idProduct).del().returning('image');
    const delImage = oldImage.map((o) => {
      const public_id = o.image.split('/').splice(-1)[0].slice(0, -4);
      return cloudinary.uploader.destroy('sale_final/product/' + public_id);
    });
    await Promise.all(delImage);
    await trx.commit();
    return {
      code: 0,
      message: MESSAGE.DEL_PRODUCT_SUCCESS,
    }
  },
}

module.exports = AdminService;