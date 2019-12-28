const bcrypt = require('bcryptjs')

module.exports = {
    hash(password){
        let salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    },
    compare(password, hashedPassword){
        return bcrypt.compareSync(password, hashedPassword)
    }
}