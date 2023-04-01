const { v4 } = require('uuid');
const fs = require('fs');

const typeFile = [
  'jpeg',
  'png',
  'gif',
  'tiff',
  'psd',
  'pdf',
  'eps',
  'ai',
  'heic',
  'raw',
  'svg',
  'jpg',
];

const image = {
  sizeBase64: (url) => {
    let y = 1;
    if (url.endsWith('==')) y = 2;
    const xSize = url.length * 0.75 - y;
    return Math.round(xSize / (1024 * 1024));
  },

  checkType: (str) => {
    // data:@file/jpeg;base64,/9j/4AAQSkZJRgABAQA
    const file = str.split(';base64')[0];
    const origin = file.split('/')[1];
    if (origin) return typeFile.includes(origin.toLowerCase());
    return false;
  },

  convertImage: (binaryUrl, folder) => {
    const buff = Buffer.from(binaryUrl.split('base64,')[1], 'base64');
    const filename = `${v4() + Date.now()}.jpg`;
    const foldername = `${folder}/${filename}`;
    fs.writeFileSync(`./tmp/img/${foldername}`, buff);
    return foldername;
  },

  deleteImage: (path) => {
    const fullPath = `./tmp/img/${path}`;
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      return true;
    }
    return false;
  },
}

module.exports = image;