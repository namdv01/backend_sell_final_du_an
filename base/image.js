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
}

module.exports = image;