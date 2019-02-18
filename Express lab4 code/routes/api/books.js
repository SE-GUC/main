const express = require('express')
const router = express.Router()

// We will be connecting using database 
const books = require('../../models/Book')

router.get('/', (req,res) => res.json({data: books}))

module.exports = router