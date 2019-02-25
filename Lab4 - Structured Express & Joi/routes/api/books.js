const express = require('express')
const router = express.Router()

// We will be connecting using database 
const Book = require('../../models/Book')

// temporary data created as if it was pulled out of the database ...
const books = [
    new Book('The Prince', 'Niccolò Machiavelli', 140, 1513),
    new Book('Crime and Puishment', 'Fyodor Dostoyevsky', 671, 1866),
    new Book('War and Peace', 'Leo Tolstoy', 1392, 1867),
    new Book('The Art of War', 'Sun Tzu', 273, 500),
    new Book('Macbeth', 'William Shakespeare', 349, 1606),
    new Book('A Tale of Two Cities', 'Charles Dickens', 489, 1859),
    new Book('The Archetypes and the Collective Unconscious', 'Carl Jung', 550, 1959),
    new Book('Man\'s Search for Meaning', 'Viktor Frankl', 165, 1946)
];

router.get('/', (req, res) => res.json({ data: books }))

module.exports = router