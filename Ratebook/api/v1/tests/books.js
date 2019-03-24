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
// This file (api/v1/tests/books.js)
// tests the (post, get, put and delete) requests
// starting from `/api/v1/books`
//
// It defines a class BooksTest
// Its constructor takes 1 argument, the server port
//
// Usage:
//  ...
//  new BooksTest(3000).runIndependently().then(result => ...)
//  ...
//
// Once all entites independet tests pass start running
// new BooksTest(3000).runDependently().then(result => ...)
//
// A bit complicated, don't you get attached to the details ..
//
// The next functions have 2 kinds suffixes
// 1- <function_name>Independently
// 2- <function_name>Dependently
//
// runAll():
// returns a promise, so in case you need it
// to finish, just make sure you wait for it to resolve
// by using .then(result => ...)
// just like mentioned in the example above
//
// postRequest():
// is responsible for testing all the post requests of all
// the routes starting from `/api/v1/books`
//
// getRequest():
// is responsible for testing all the get requests of all
// the routes starting from `/api/v1/books`
//
// putRequest():
// is responsible for testing all the put requests of all
// the routes starting from `/api/v1/books`
//
// deleteRequest():
// is responsible for testing all the delete requests of all
// the routes starting from `/api/v1/books`
//= =---------------------------------------------------= =//

const nfetch = require('node-fetch')
const AbstractTests = require('./AbstractTests')
const Book = require('../models/Book')

//= =---------------------------------------------------= =//
//= =--- BooksTest class
//= =---------------------------------------------------= =//
class BooksTest extends AbstractTests {
  constructor (PORT, ROUTE) {
    super(PORT, ROUTE)
    this.sharedState = {
      id: null,
      title: null,
      author: null,
      release_date: null,
      ratings: null
    }
  }

  runIndependently () {
    super.runIndependently()
    try {
      return new Promise((resolve, reject) => {
        describe('Making sure independent books routes work', () => {
          this.postRequestIndependently()
          this.getRequestIndependently()
          this.putRequestIndependently()
          this.deleteRequestIndependently()
        })
        resolve()
      })
    } catch (err) {}
  }

  runDependently () {
    super.runDependently()
    try {
      return new Promise((resolve, reject) => {
        describe('Making sure dependent books routes work', () => {
          this.postRequestDependently()
          this.getRequestDependently()
          this.putRequestDependently()
          this.deleteRequestDependently()
        })
        resolve()
      })
    } catch (err) {}
  }

  postRequestIndependently () {
    const requestBody = {
      title: 'A Tale of Two Cities',
      author: 'Charles Dickens',
      release_date: new Date(1859, 1, 1)
    }

    test(`Randomly creating a new book,\t\t[=> POST\t${this.base_url}\t`, async () => {
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

  getRequestIndependently () {
    test(`Fetching the data of that random book,\t[=> GET\t\t${this.base_url}/:id\t`, async () => {
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
      expect(new Date(jsonResponse.data.release_date)).toEqual(this.sharedState.release_date)
      jsonResponse.data.ratings.forEach((item, index) => {
        expect(item).toMatchObject(this.sharedState.ratings[index])
      })
    })
  }

  putRequestIndependently () {
    const requestBody = {
      title: 'The Art of War',
      author: 'Sun Tzu',
      release_date: new Date(500, 1, 1),
      ratings: []
    }
    test(`Updating the data of that random book,\t[=> PUT\t\t${this.base_url}/:id\t`, async () => {
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
      expect(new Date(jsonResponse.data.release_date)).toEqual(book.release_date)
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

  deleteRequestIndependently () {
    test(`Deleting that random book,\t\t\t[=> DELETE\t${this.base_url}/:id\t`, async () => {
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

  postRequestDependently () {

  }

  getRequestDependently () {

  }

  putRequestDependently () {

  }

  deleteRequestDependently () {

  }
}
//= =---------------------------------------------------= =//

module.exports = BooksTest
