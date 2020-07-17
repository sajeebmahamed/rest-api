const express = require('express')
const router = express.Router()
const contactController = require('../controller/contactController')


// get 
router.get('/', contactController.getAllContactController)
// post 
router.post('/', contactController.postallContactController)
// single id 
router.get('/:id', contactController.getSingleId)
// put 
router.put('/:id', contactController.updateContact)
// delete 
router.delete('/:id', contactController.deleteContact)

module.exports = router