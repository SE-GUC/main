// Import express
const express = require('express')
// Create the app
const app = express()
// Use it with post
app.use(express.json())

// We will treat this array of books as our database for now
const books = [
    {
        title: 'The Prince',
        author: 'Niccolò Machiavelli',
        numberOfPages: 140,
        releaseYear: '1513',
        id: '1'
    },
    {
        title: 'Crime and Puishment',
        author: 'Fyodor Dostoyevsky',
        numberOfPages: 671,
        releaseYear: '1866',
        id: '2'
    },
    {
        title: 'War and Peace',
        author: 'Leo Tolstoy',
        numberOfPages: 1392,
        releaseYear: '1867' ,
        id: '3'
    },
    {
        title: 'The Art of War',
        author: 'Sun Tzu',
        numberOfPages: 273,
        releaseYear: '500' ,
        id: '4'
    },
    {
        title: 'Macbeth',
        author: 'William Shakespeare',
        numberOfPages: 349,
        releaseYear: '1606',
        id: '5' 
    },
    {
        title: 'A Tale of Two Cities',
        author: 'Charles Dickens',
        numberOfPages: 489,
        releaseYear: '1859' ,
        id: '6'
    },
    {
        title: 'The Archetypes and the Collective Unconscious',
        author: 'Carl Jung',
        numberOfPages: 550,
        releaseYear: '1959' ,
        id: '7'
    },
    {
        title: 'Man\'s Search for Meaning',
        author: 'Viktor Frankl',
        numberOfPages: 165,
        releaseYear: '1946' ,
        id: '8'
    }
]

// Default route (entry point)
app.get('/', (req, res) => {
    res.send(`<h1>Welcome</h1>`)
})

// Get all books
app.get('/api/books', (req, res) => {
    res.send(books)
})


// Get a certain book
app.get('/api/books/:id', (req, res) => {
    const bookId = req.params.id
    const book = books.find(book => book.id === bookId)
    res.send(book)
})

// Create a book
app.post('/api/books/', (req, res) => {
    const title = req.body.title
    const author = req.body.author
    const numberOfPages = req.body.numberOfPages
    const releaseYear = req.body.releaseYear
    
    const book = {
        title: title,
        author: author,
        numberOfPages: numberOfPages,
        releaseYear: releaseYear,
        id: books.length + 1
    }
    books.push(book)
    res.send(books)
})


// Update a book's title
app.put('/api/books/:id', (req, res) => {
    const bookId = req.params.id 
    const updatedTitle = req.body.title
    const book = books.find(book => book.id === bookId)
    book.title = updatedTitle
    res.send(books)
})


// Delete a book
app.delete('/api/books/:id', (req, res) => {
    const bookId = req.params.id 
    const book = books.find(book => book.id === bookId)
    const index = books.indexOf(book)
    books.splice(index,1)
    res.send(books)
})

// Define the port, get it from the enviroment (used in production)
// Or just use 3000
const port = process.env.PORT | 3000
app.listen(port, () => console.log(`Server up and running on port ${port}`))
 