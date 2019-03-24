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
// This file (generate.js)
// only generates some data to the database
//
// Here I generate a 2 new users and 1 new Book
//
// I first create a user called `monsieur robot`
// Then I create a user called `madame robote`
// finally, I create a new book using these 2 users as voters
//= =---------------------------------------------------= =//

require('dotenv').config()
const mongoose = require('mongoose')
const nfetch = require('node-fetch')

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
// ---== CONNECT TO MONGO ATLAS
//= =---------------------------------------------------= =//
mongoose.connect(`${MONGO_DNS_SRV}${MONGO_AUTH}${MONGO_CLUSTER}${MONGO_DB_NAME}${MONGO_OPTIONS}`, {
  useNewUrlParser: true
})
//= =---------------------------------------------------= =//

//= =---------------------------------------------------= =//
// ---== Clean database first
//= =---------------------------------------------------= =//
mongoose.connection.dropDatabase()
//= =---------------------------------------------------= =//

//= =---------------------------------------------------= =//
// ---== Generate Data
//= =---------------------------------------------------= =//
async function genAll () {
  const createUser = async (requestBody) => {
    return new Promise(async (resolve, reject) => {
      const response = await nfetch(`http://localhost:${PORT}/api/v1/users`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      if ('data' in jsonResponse) {
        resolve(jsonResponse.data)
      } else {
        reject(jsonResponse.error)
      }
    })
  }

  const createBook = async (requestBody) => {
    return new Promise(async (resolve, reject) => {
      const response = await nfetch(`http://localhost:${PORT}/api/v1/books`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      if ('data' in jsonResponse) {
        resolve(jsonResponse.data)
      } else {
        reject(jsonResponse.error)
      }
    })
  }

  const monsieur = await createUser({
    name: 'monsieur robot',
    birthdate: '1999-01-31',
    gender: 'male'
  })

  const madame = await createUser({
    name: 'madame robote',
    birthdate: '1999-01-31',
    gender: 'female'
  })

  await createBook({
    title: 'A Tale of Two Cities',
    author: 'Charles Dickens',
    release_date: '1859-01-01',
    ratings: [{
      rate: 4,
      voter: monsieur._id
    },
    {
      rate: 5,
      voter: madame._id
    }]
  })
}

genAll()
//= =---------------------------------------------------= =//
