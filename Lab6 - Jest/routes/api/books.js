const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Book = require('../../models/Book')
const validator = require('../../validations/bookValidations')

router.get('/', async (req,res) => {
    const books = await Book.find()
    res.json({data: books})
})


// Create a book
router.post('/', async (req,res) => {
   try {
    const isValidated = validator.createValidation(req.body)
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    const newBook = await Book.create(req.body)
    res.json({msg:'Book was created successfully', data: newBook})
   }
   catch(error) {
       // We will be handling the error later
       console.log(error)
   }  
})

// Update a book
router.put('/:id', async (req,res) => {
    try {
     const id = req.params.id
     const book = await Book.findOne({id})
     if(!book) return res.status(404).send({error: 'Book does not exist'})
     const isValidated = validator.updateValidation(req.body)
     if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
     const updatedBook = await Book.updateOne(req.body)
     res.json({msg: 'Book updated successfully'})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 })

 router.delete('/:id', async (req,res) => {
    try {
     const id = req.params.id
     const deletedBook = await Book.findByIdAndRemove(id)
     res.json({msg:'Book was deleted successfully', data: deletedBook})
    }
    catch(error) {
        // We will be handling the error later
        console.log(error)
    }  
 })

 

module.exports = router