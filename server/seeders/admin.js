const User = require('../models/User');

module.exports = function() {
    User
        .create({
            name: 'Admin',
            email: 'admin@mail.com',
            password: 'rootadmin',
            isAdmin: true
        })
        .then( data => console.log(data))
        .catch(err => console.log(err))
}
