const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserController {
    static register(req, res, next) {
        const { name, email, password, adminPass } = req.body;
        User.findOne({
            email
        })
            .then(user => {
                if (!req.body.password) {
                    let err = {
                        status: 400,
                        msg: "Password should not be empty."
                    }
                    next(err);
                }

                if (user) {
                    let err = {
                        status: 400,
                        msg: "Email user is already registered!"
                    }
                    next(err);

                } else {
                    let isAdmin = adminPass ? true : false;
                    let isValidAdminPass = adminPass === process.env.ADMIN_PASS;
                    if (isAdmin && !isValidAdminPass) {
                        let err = {
                            status: 400,
                            msg: 'Invalid admin pass'
                        }
                        next(err);
                    } else {
                        User
                        .create({
                            name,
                            email,
                            password,
                            isAdmin
                        })
                        .then( data => {
                            let token = jwt.sign({
                                id: data.id, 
                                email: data.email, 
                                isAdmin: data.isAdmin}, 
                            process.env.JWT_SECRET);

                            res.status(201).json({
                                token,
                                name: data.name,
                                email: data.email,
                                isAdmin: data.isAdmin
                            });
                        })
                        .catch( err => {
                            next(err);
                        })
                    }
                }
            })
            .catch( err => {
                next(err);
            })
    }

    static login(req, res, next) {
        const { email, password } = req.body;
        User
            .findOne({
                email
            })
            .then( user => {
                if (!req.body.email || !req.body.password) {
                    let err = {
                        status: 400,
                        msg: 'Bad Request'
                    }
                    next(err);
                }
                if(user) {
                    if (bcrypt.compareSync(password, user.password)) {
                        let token = jwt.sign({
                            id: user.id, 
                            email: user.email, 
                            isAdmin: user.isAdmin}, 
                        process.env.JWT_SECRET);
                        res.status(200).json({
                            token,
                            name: user.name,
                            email: user.email,
                            isAdmin: user.isAdmin
                        });
                    } else {
                        let err = {
                            status: 404,
                            msg: 'Invalid Email/Password'
                        }
                        next(err);
                    }
                } else {
                    let err = {
                        status: 404,
                        msg: 'Invalid Email/Password'
                    }
                    next(err);
                }
            })
            .catch( err => {
                next(err);
            })
    }
}

module.exports = UserController;