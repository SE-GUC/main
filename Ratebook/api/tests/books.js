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
// This file (api/tests/books.js)
// tests the (post, get, put and delete) requests
// starting from `/books`
//
// It defines a class BooksTest
// Its constructor takes 1 argument, the server port
//
// Usage:
//  new BooksTest(3000).runAll().then(result => ...)
//
// runAll():
// returns a promise, so in case you need it
// to finish, just make sure you wait for it to resolve
// by using .then(result => ...)
// just like mentioned in the example above
//
// postRequest():
// is responsible for testing all the post requests of all
// the routes starting from `/books`
//
// getRequest():
// is responsible for testing all the get requests of all
// the routes starting from `/books`
//
// putRequest():
// is responsible for testing all the put requests of all
// the routes starting from `/books`
//
// deleteRequest():
// is responsible for testing all the delete requests of all
// the routes starting from `/books`
//= =---------------------------------------------------= =//

const nfetch = require('node-fetch')
const Book = require('../models/Book')

//= =---------------------------------------------------= =//
//= =--- BooksTest class
//= =---------------------------------------------------= =//
class BooksTest {
  constructor (PORT) {
    this.base_url = `http://localhost:${PORT}/books`
    this.sharedState = {
      id: null,
      title: null,
      author: null,
      release_date: null,
      ratings: null
    }
    this.runAll = this.runAll.bind(this)
    this.postRequest = this.postRequest.bind(this)
    this.getRequest = this.getRequest.bind(this)
    this.putRequest = this.putRequest.bind(this)
    this.deleteRequest = this.deleteRequest.bind(this)
  }

  runAll () {
    try {
      return new Promise((resolve, reject) => {
        this.postRequest()
        this.getRequest()
        this.putRequest()
        this.deleteRequest()
        resolve()
      })
    } catch (err) {}
  }

  postRequest () {
    const requestBody = {
      title: 'A Tale of Two Cities',
      author: 'Charles Dickens',
      release_date: '1859-01-01'
    }

    test(`Testing => POST ${this.base_url}`, async () => {
      const response = await nfetch(`${this.base_url}`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()

      // check if the json response has data not error
      expect(Object.keys(jsonResponse)).toEqual(['data'])
      expect(Object.keys(jsonResponse)).not.toEqual(['error'])

      // go check in the mongo database
      const book = await Book.findOne(requestBody).exec()
      expect(book).toMatchObject(requestBody)
      this.sharedState.id = book._id
      this.sharedState.title = book.title
      this.sharedState.author = book.author
      this.sharedState.release_date = book.release_date
      this.sharedState.ratings = book.ratings
    })
  }

  getRequest () {
    test(`Testing => GET ${this.base_url}/:id`, async () => {
      const response = await nfetch(`${this.base_url}/${this.sharedState.id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      // check if the json response has data not error
      expect(Object.keys(jsonResponse)).toEqual(['data'])
      expect(Object.keys(jsonResponse)).not.toEqual(['error'])

      expect(jsonResponse.data.title).toEqual(this.sharedState.title)
      expect(jsonResponse.data.author).toEqual(this.sharedState.author)
      expect(jsonResponse.data.release_date).toEqual(this.sharedState.release_date)
      jsonResponse.data.ratings.forEach((item, index) => {
        expect(item).toMatchObject(this.sharedState.ratings[index])
      })
    })
  }

  putRequest () {
    const requestBody = {
      title: 'The Art of War',
      author: 'Sun Tzu',
      release_date: '500-01-01',
      ratings: []
    }
    test(`Testing => PUT ${this.base_url}/:id`, async () => {
      const response = await nfetch(`${this.base_url}/${this.sharedState.id}`, {
        method: 'PUT',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      // check if the json response has data not error
      expect(Object.keys(jsonResponse)).toEqual(['data'])
      expect(Object.keys(jsonResponse)).not.toEqual(['error'])

      const book = await Book.findOne(requestBody).exec()
      expect(jsonResponse.data.title).toEqual(book.title)
      expect(jsonResponse.data.author).toEqual(book.author)
      expect(jsonResponse.data.release_date).toEqual(book.release_date)
      jsonResponse.data.ratings.forEach((item, index) => {
        expect(item).toMatchObject(book.ratings[index])
      })
      this.sharedState.id = book._id
      this.sharedState.title = book.title
      this.sharedState.author = book.author
      this.sharedState.release_date = book.release_date
      this.sharedState.ratings = book.ratings
    })
  }

  deleteRequest () {
    test(`Testing => DELETE ${this.base_url}/:id`, async () => {
      const response = await nfetch(`${this.base_url}/${this.sharedState.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      // check if the json response has data not error
      expect(Object.keys(jsonResponse)).toEqual(['data'])
      expect(Object.keys(jsonResponse)).not.toEqual(['error'])

      const checkBook = await Book.findOne({ _id: this.sharedState.id }).exec()
      expect(checkBook).toEqual(null)
    })
  }
}
//= =---------------------------------------------------= =//

module.exports = BooksTest
