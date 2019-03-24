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
// This file (api/v1/routes/books.js)
// is handling routes starting with `/api/v1/books`
//= =---------------------------------------------------= =//

const joi = require('joi')
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

const Book = require('../models/Book')

//= =---------------------------------------------------= =//
//= =--- HANDLE books lists
//= =---------------------------------------------------= =//
router
  .route('/')
  .post(async (request, response) => {
    const status = joi.validate(request.body, {
      title: joi.string().min(2).required(),
      author: joi.string().min(2).required(),
      release_date: joi.date().required(),
      ratings: joi.array().items(joi.object().keys({
        rate: joi.number().min(0).max(5).required(),
        voter: joi.string().length(24).required()
      }))
    })
    if (status.error) {
      return response.json({ error: status.error.details[0].message })
    }
    try {
      const book = await new Book({
        _id: mongoose.Types.ObjectId(),
        title: request.body.title,
        author: request.body.author,
        release_date: request.body.release_date,
        ratings: request.body.ratings || []
      }).save()
      return response.json({ data: book })
    } catch (err) {
      return response.json({ error: `Error, couldn't create a new book with the following data` })
    }
  })
  .get(async (request, response) => {
    try {
      const allBooks = await Book.find({}).exec()
      return response.json({ data: allBooks })
    } catch (err) {
      return response.json({ error: `Error, Couldn't fetch the list of all books from the database` })
    }
  })
//= =---------------------------------------------------= =//

//= =---------------------------------------------------= =//
//= =--- HANDLE book detail
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
      const book = await Book.findById(request.params.id).exec()
      return response.json({ data: book })
    } catch (err) {
      return response.json({ error: `Error, couldn't find a book given the following id` })
    }
  })
  .put(async (request, response) => {
    Book.findByIdAndUpdate(request.params.id, request.body, { new: true }, (err, model) => {
      if (!err) {
        return response.json({ data: model })
      } else {
        return response.json({ error: `Error, couldn't update a book given the following data` })
      }
    })
  })
  .delete((request, response) => {
    Book.findByIdAndDelete(request.params.id, (err, model) => {
      if (!err) {
        return response.json({ data: null })
      } else {
        return response.json({ error: `Error, couldn't delete a book given the following data` })
      }
    })
  })
//= =---------------------------------------------------= =//

//= =---------------------------------------------------= =//
//= =--- HANDLE book voting details
//= =---------------------------------------------------= =//
router
  .route('/:id/vote')
  .all(async (request, response, next) => {
    const status = joi.validate(request.params, {
      id: joi.string().length(24).required()
    })
    if (status.error) {
      return response.json({ error: status.error.details[0].message })
    }
    next()
  })
  .post(async (request, response) => {
    try {
      const status = joi.validate(request.body, {
        rate: joi.number().min(0).max(5).required(),
        voter: joi.string().length(24).required()
      })
      if (status.error) {
        return response.json({ error: status.error.details[0].message })
      }
      const rate = {
        _id: mongoose.Types.ObjectId(),
        rate: request.body.rate,
        voter: request.body.voter
      }
      const book = await Book.findByIdAndUpdate(request.params.id, { $push: { ratings: rate } }).exec()
      return response.json({ data: book })
    } catch (err) {
      return response.json({ error: `Error, couldn't vote for a book given the following data` })
    }
  })
  .put(async (request, response) => {
    try {
      const status = joi.validate(request.body, {
        rate: joi.number().min(0).max(5).required(),
        voter: joi.string().length(24).required()
      })
      if (status.error) {
        return response.json({ error: status.error.details[0].message })
      }
      const rate = {
        _id: mongoose.Types.ObjectId(),
        rate: request.body.rate,
        voter: request.body.voter
      }
      const book = await Book.findByIdAndUpdate(request.params.id, { $set: { ratings: rate } }).exec()
      return response.json({ data: book })
    } catch (err) {
      return response.json({ error: `Error, couldn't update a vote for a book given the following data` })
    }
  })
//= =---------------------------------------------------= =//

module.exports = router
