const bcrypt = require('bcryptjs');

const hash = (password) => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

const compare = (passwordInput, passwordDB) => {
    return bcrypt.compareSync(passwordInput, passwordDB);

}

module.exports = {
    hash,
    compare
}