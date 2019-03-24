//= =---------------------------------------------------= =//
//= =--- LICENSE
//= =---------------------------------------------------= =//
// Copyright 2019 Omar Sherif Fathy
//
// Permission is hereby granted, free of charge,
// to any person obtaining a copy of this software and
// associated documentation files (the "Software"),
// to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify,
// merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom
// the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice
// shall be included in all copies or substantial portions
// of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY
// OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO
// EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
// FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
// AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
// OTHER DEALINGS IN THE SOFTWARE.
//= =---------------------------------------------------= =//

//= =---------------------------------------------------= =//
//= =--- DESCRIPTION
//= =---------------------------------------------------= =//
// This file (index.js)
// only configures the server and handles the very basic
// routes of the app like the homepage and the 404 pages
//
// I use dotenv in order to capture the environment
// variables from `.env` file which should define values
// for these variables
//= =---------------------------------------------------= =//

require('dotenv').config()
const Logger = require('./api/v1/middlewares/Logger')
const mongoose = require('mongoose')
const express = require('express')
const app = express()

const users = require('./api/v1/routes/users')
const books = require('./api/v1/routes/books')

//= =---------------------------------------------------= =//
//= =--- CAPTURE ENVIRONMENT VARIABLES
//= =---------------------------------------------------= =//
const {
  PORT = 7000,
  MONGO_DNS_SRV,
  MONGO_AUTH,
  MONGO_CLUSTER,
  MONGO_DB_NAME,
  MONGO_OPTIONS
} = process.env
//= =---------------------------------------------------= =//

//= =---------------------------------------------------= =//
//= =--- Use Express json parser
//= =---------------------------------------------------= =//
app.use(express.json())
//= =---------------------------------------------------= =//

//= =---------------------------------------------------= =//
// ---== LOGGER MIDDLEWARE
//= =---------------------------------------------------= =//
app.use((request, response, next) => {
  Logger.log(`${request.method} => ${request.originalUrl}`)
  next()
})
//= =---------------------------------------------------= =//

//= =---------------------------------------------------= =//
// ---== HANDLE Homepage
//= =---------------------------------------------------= =//
app.get('/favicon.ico', (req, res) => res.status(204))
app.get('/', (request, response) => {
  response.send(`
  Welcome To Ratebook !<br>
  <a href="/api/v1/users">Users</a><br>
  <a href="/api/v1/books">Books</a>
  `)
})
//= =---------------------------------------------------= =//

//= =---------------------------------------------------= =//
// ---== HANDLE SubRoutes
//= =---------------------------------------------------= =//
app.use('/api/v1/users', users)
app.use('/api/v1/books', books)
//= =---------------------------------------------------= =//

//= =---------------------------------------------------= =//
// ---== HANDLE 404
//= =---------------------------------------------------= =//
app.use((request, response) => {
  response.status(404).send(`Page 404 not found`)
})
//= =---------------------------------------------------= =//

//= =---------------------------------------------------= =//
// ---== CONNECT TO MONGO ATLAS
//= =---------------------------------------------------= =//
mongoose.connect(`${MONGO_DNS_SRV}${MONGO_AUTH}${MONGO_CLUSTER}${MONGO_DB_NAME}${MONGO_OPTIONS}`, {
  useNewUrlParser: true
})
//= =---------------------------------------------------= =//

//= =---------------------------------------------------= =//
// ---== RUN SERVER LOOP
//= =---------------------------------------------------= =//
app.listen(PORT, () => console.log(`Running server on port ${PORT}`))
//= =---------------------------------------------------= =//
