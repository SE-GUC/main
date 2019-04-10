const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create the schema
const BookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    numberOfPages: {
        type: Number,
        required: true
    },
    releaseYear: {
        type: String, 
        required: true
    },
    reviews: {
        type: [String]
    }
})

module.exports = Book = mongoose.model('books', BookSchema)