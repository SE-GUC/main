const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const cors = require('cors')

// Require Router Handlers
const users = require('./routes/api/users')
const books = require('./routes/api/books')

const app = express()

// DB Config
const db = require('./config/keys').mongoURI

// Connect to mongo
mongoose
    .connect(db)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err))

// Init middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use(passport.initialize())

// // Passport configuration
require('./config/passport')(passport)
// Entry point
app.get('/', (req,res) => res.send(`<h1>Book Store</h1>`))

// Direct to Route Handlers
app.use('/api/users', users)
app.use('/api/books', books)


const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server on ${port}`))