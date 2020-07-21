const bcrypt = require('bcrypt')
const User = require('../models/UserModel')

const registerController = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) {
            res.json({
                error: err
            })
        }

        let user = new User({
            email: req.body.email,
            password: hash
        })
        user.save()
            .then(result => {
                res.status(201).json({
                    message: 'User created successfully',
                    user: result
                })
            })
            .catch(error => {
                res.json({
                    error
                })
            })
    })
}

const loginController = (req, res, next) => {
    let email = req.body.email
    let passsword = req.body.passsword

    User.findOne({email: email})
        .then(user => {
            if (user) {
                bcrypt.compare(passsword, user.passsword, (err, result) => {
                    if(err) {
                        res.json({
                            message: 'error'
                        })
                    }
                    if(result){
                        res.json({
                            message: 'login success'
                        })
                    }else{
                        res.json({
                            message: 'login failed'
                        })
                    }
                })
            }else{
                res.json({
                    message: 'user not found'
                })
            }
        })
}

const getAlluser = (req, res, next) => {
    User.find()
        .then(users => {
            res.json({
                users
            })
        })
        .catch(error => {
            res.json({
                error
            })
        })
}

module.exports = {
    registerController,
    loginController,
    getAlluser
}