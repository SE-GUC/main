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
// This file (api/v1/routes/users.js)
// is handling routes starting with `/api/v1/users`
//= =---------------------------------------------------= =//

const joi = require('joi')
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

const User = require('../models/User')

//= =---------------------------------------------------= =//
//= =--- HANDLE users lists
//= =---------------------------------------------------= =//
router
  .route('/')
  .post(async (request, response) => {
    const status = joi.validate(request.body, {
      name: joi.string().min(2).required(),
      birthdate: joi.date().required(),
      gender: joi.string().valid(['male', 'female']).required()
    })
    if (status.error) {
      return response.json({ error: status.error.details[0].message })
    }
    try {
      const user = await new User({
        _id: mongoose.Types.ObjectId(),
        name: request.body.name,
        birthdate: request.body.birthdate,
        gender: request.body.gender
      }).save()
      return response.json({ data: user })
    } catch (err) {
      return response.json({ error: `Error, couldn't create a new user with the following data` })
    }
  })
  .get(async (request, response) => {
    try {
      const allUsers = await User.find({}).exec()
      return response.json({ data: allUsers })
    } catch (err) {
      return response.json({ error: `Error, Couldn't fetch the list of all users from the database` })
    }
  })
//= =---------------------------------------------------= =//

//= =---------------------------------------------------= =//
//= =--- HANDLE user detail
//= =---------------------------------------------------= =//
router
  .route('/:id')
  .all(async (request, response, next) => {
    const status = joi.validate(request.params, {
      id: joi.string().length(24).required()
    })
    if (status.error) {
      return response.json({ error: status.error.details[0].message })
    }
    next()
  })
  .get(async (request, response) => {
    try {
      const user = await User.findById(request.params.id).exec()
      return response.json({ data: user })
    } catch (err) {
      return response.json({ error: `Error, couldn't find a user given the following id` })
    }
  })
  .put((request, response) => {
    User.findByIdAndUpdate(request.params.id, request.body, { new: true }, (err, model) => {
      if (!err) {
        return response.json({ data: model })
      } else {
        return response.json({ error: `Error, couldn't update a user given the following data` })
      }
    })
  })
  .delete((request, response) => {
    User.findByIdAndDelete(request.params.id, (err, model) => {
      if (!err) {
        return response.json({ data: null })
      } else {
        return response.json({ error: `Error, couldn't delete a user given the following data` })
      }
    })
  })
//= =---------------------------------------------------= =//

module.exports = router
