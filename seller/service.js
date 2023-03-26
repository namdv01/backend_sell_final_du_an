const { v4 } = require('uuid');
const imageService = require('../base/image');
const { connectPg: pg } = require('../base/connectDb');
const MESSAGE = require('../constant/message');

const SellerService = {
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

  async createShop(body) {
    const { name, id_user, address, logo } = body;
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
  }
}

module.exports = SellerService;