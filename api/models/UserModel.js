const mongoose = require('mongoose')
const Scheema = mongoose.Schema
const valid = require('validator')

const userScheema = new Scheema({
    email: {
        type: String,
        trim: true,
        validate: {
            validator: (v) => {
                return valid.isEmail(v)
            },
            message: `{VALUE} is not an email`
        }
    },
    password: String
})

const User = mongoose.model('User', userScheema)
module.exports = User