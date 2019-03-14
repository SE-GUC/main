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
// This file (api/tests/users.js)
// tests the (post, get, put and delete) requests
// starting from `/users`
//
// It defines a class UsersTest
// Its constructor takes 1 argument, the server port
//
// Usage:
//  new UsersTest(3000).runAll().then(result => ...)
//
// runAll():
// returns a promise, so in case you need it
// to finish, just make sure you wait for it to resolve
// by using .then(result => ...)
// just like mentioned in the example above
//
// postRequest():
// is responsible for testing all the post requests of all
// the routes starting from `/users`
//
// getRequest():
// is responsible for testing all the get requests of all
// the routes starting from `/users`
//
// putRequest():
// is responsible for testing all the put requests of all
// the routes starting from `/users`
//
// deleteRequest():
// is responsible for testing all the delete requests of all
// the routes starting from `/users`
//= =---------------------------------------------------= =//

const nfetch = require('node-fetch')
const User = require('../models/User')

//= =---------------------------------------------------= =//
//= =--- UsersTest class
//= =---------------------------------------------------= =//
class UsersTest {
  constructor (PORT) {
    this.base_url = `http://localhost:${PORT}/users`
    this.sharedState = {
      id: null,
      name: null,
      birthdate: null,
      gender: null
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
      name: 'monsieur automation robot',
      birthdate: '1999-01-31',
      gender: 'male'
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
      const user = await User.findOne(requestBody).exec()
      expect(user).toMatchObject(requestBody)
      this.sharedState.id = user.id
      this.sharedState.name = user.name
      this.sharedState.birthdate = user.birthdate
      this.sharedState.gender = user.gender
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

      expect(jsonResponse.data.name).toEqual(this.sharedState.name)
      expect(jsonResponse.data.birthdate).toEqual(this.sharedState.birthdate)
      expect(jsonResponse.data.gender).toEqual(this.sharedState.gender)
    })
  }

  putRequest () {
    const requestBody = {
      name: 'madame automation robote',
      birthdate: '1999-01-31',
      gender: 'female'
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

      const user = await User.findOne(requestBody).exec()
      expect(jsonResponse.data.name).toEqual(user.name)
      expect(jsonResponse.data.birthdate).toEqual(user.birthdate)
      expect(jsonResponse.data.gender).toEqual(user.gender)
      this.sharedState.id = user.id
      this.sharedState.name = user.name
      this.sharedState.birthdate = user.birthdate
      this.sharedState.gender = user.gender
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

      // make sure the user hase been removed
      const checkUser = await User.findOne({ _id: this.sharedState.id }).exec()
      expect(checkUser).toEqual(null)
    })
  }
}
//= =---------------------------------------------------= =//

module.exports = UsersTest
