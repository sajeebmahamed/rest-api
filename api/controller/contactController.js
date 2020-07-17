const Contact = require('../models/ContactModel')

const getAllContactController = (req, res, next) => {
    Contact.find()
        .then(contacts => {
            res.status(200).json({
                message: 'All Contact',
                contacts
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Error Occured',
                error: err
            })
        })
}
const postallContactController = (req, res, next) => {
    const contact = new Contact({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    })
    contact.save()
        .then(data => {
            res.status(201).json({
                message: 'Contact added successfull',
                contact: data
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Error Occured',
                error: err
            })
        })
}
const getSingleId = (req, res, next) => {
    let id = req.params.id
    Contact.findById(id)
        .then(contacts => {
            res.status(200).json({
                message: 'single Contact',
                contacts
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Error Occured',
                error: err
            })
        })
}
const deleteContact = (req, res, next) => {
    let id = req.params.id
    Contact.findByIdAndRemove(id)
        .then(result => {
            res.json({
                message: 'deleted',
                result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'error',
                error: err
            })
        })
}

const updateContact = (req, res, next) => {
    let id = req.params.id
    let updatedContact = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    }
    Contact.findByIdAndUpdate(id, {
            $set: updatedContact
        })
        .then(contact => {
            Contact.findById(contact._id)
                .then(newContact => {
                    res.json({
                        message: 'updated',
                        contact
                    })
                })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'error',
                error: err
            })
        })
}

module.exports = {
    getAllContactController,
    postallContactController,
    getSingleId,
    deleteContact,
    updateContact
}