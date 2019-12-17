"use strict";

const bcrypt = require("bcryptjs");

module.exports = {
  hashPass(password) {
    return bcrypt.hashSync(password, 10);
  },

  validatePass(pass, hash) {
    return bcrypt.compareSync(pass, hash);
  }
};
