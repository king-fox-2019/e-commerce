const bcrypt = require('bcryptjs')

function hash(password) {
    return bcrypt.hashSync(password, 6)
}

function deHash(password, db_password) {
    return bcrypt.compareSync(password, db_password)
}

module.exports = {
    hash,
    deHash
}