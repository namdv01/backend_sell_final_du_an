const bcrypt = require('bcryptjs');

const password = {
  check(input, hash) {
    return bcrypt.compareSync(input, hash);
  },

  hash(input) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(input, salt);
  },
};

module.exports = password;