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
// This file (api/v1/tests/users.js)
// tests the (post, get, put and delete) requests
// starting from `/api/v1/users`
//
// It defines a class UsersTest, inherits from AbstractTests
// Its constructor takes 2 arguments,
// the server port and the route on which to test
//
// This class has 2 categories of functions
// 1- Independent
// 2- Dependent
//
// Mainly the tests which do not have any need for external
// entities it should be tested in the independent section
//
// Some tests would depend on external entities
// that's why we have dependent functions
//
// When testing we first run the independent tests on
// all entities, then if they all pass, we start
// testing all dependent tests of all the entities
//
// Usage:
//  ...
//  new UsersTest(3000).runIndependently().then(result => ...)
//  ...
//
// Once all entites independet tests pass start running
// new UsersTest(3000).runDependently().then(result => ...)
//
// A bit complicated, don't you get attached to the details ..
//
// The next functions have 2 kinds suffixes
// 1- <function_name>Independently
// 2- <function_name>Dependently
//
// run():
// returns a promise, so in case you need it
// to finish, just make sure you wait for it to resolve
// by using .then(result => ...)
// just like mentioned in the example above
//
// postRequest():
// is responsible for testing all the post requests of all
// the routes starting from `/api/v1/users`
//
// getRequest():
// is responsible for testing all the get requests of all
// the routes starting from `/api/v1/users`
//
// putRequest():
// is responsible for testing all the put requests of all
// the routes starting from `/api/v1/users`
//
// deleteRequest():
// is responsible for testing all the delete requests of all
// the routes starting from `/api/v1/users`
//= =---------------------------------------------------= =//

const nfetch = require('node-fetch')
const AbstractTests = require('./AbstractTests')
const User = require('../models/User')

//= =---------------------------------------------------= =//
//= =--- UsersTest class
//= =---------------------------------------------------= =//
class UsersTest extends AbstractTests {
  constructor (PORT, ROUTE) {
    super(PORT, ROUTE)
    this.sharedState = {
      id: null,
      name: null,
      birthdate: null,
      gender: null
    }
  }

  runIndependently () {
    super.runIndependently()
    try {
      return new Promise((resolve, reject) => {
        describe('Making sure independent users routes work', () => {
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
        describe('Making sure dependent users routes work', () => {
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
      name: 'monsieur automation robot',
      birthdate: new Date(1999, 1, 31),
      gender: 'male'
    }

    test(`Randomly creating a new user,\t\t[=> POST\t${this.base_url}\t`, async () => {
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

  getRequestIndependently () {
    test(`Fetching the data of that random user,\t[=> GET\t\t${this.base_url}/:id\t`, async () => {
      const response = await nfetch(`${this.base_url}/${this.sharedState.id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      // check if the json response has data not error
      expect(Object.keys(jsonResponse)).toEqual(['data'])
      expect(Object.keys(jsonResponse)).not.toEqual(['error'])

      expect(jsonResponse.data.name).toEqual(this.sharedState.name)
      expect(new Date(jsonResponse.data.birthdate)).toEqual(this.sharedState.birthdate)
      expect(jsonResponse.data.gender).toEqual(this.sharedState.gender)
    })
  }

  putRequestIndependently () {
    const requestBody = {
      name: 'madame automation robote',
      birthdate: new Date(1999, 1, 31),
      gender: 'female'
    }
    test(`Updating the data of that user,\t\t[=> PUT\t\t${this.base_url}/:id\t`, async () => {
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
      expect(new Date(jsonResponse.data.birthdate)).toEqual(user.birthdate)
      expect(jsonResponse.data.gender).toEqual(user.gender)
      this.sharedState.id = user.id
      this.sharedState.name = user.name
      this.sharedState.birthdate = user.birthdate
      this.sharedState.gender = user.gender
    })
  }

  deleteRequestIndependently () {
    test(`Deleting that random user,\t\t\t[=> DELETE\t${this.base_url}/:id\t`, async () => {
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

module.exports = UsersTest
