const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')


router.post('/login', userController.loginController)

router.post('/register', userController.registerController)

router.get('/', userController.getAlluser)

module.exports = router