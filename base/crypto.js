const crypto = require('crypto');

const hash = (password) => {
  const salt = crypto.randomBytes(8).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return {
    hashPassword: hash,
    salt,
  };
}

const compare = (password, { salt, hash }) => {
  const newHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return hash === newHash;
}

module.exports = { hash, compare };
