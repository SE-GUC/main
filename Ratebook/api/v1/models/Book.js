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
// This file (api/v1/models/Book.js)
// only defines a Book schema & Model
// It also contains the bookRating schema
//= =---------------------------------------------------= =//

const mongoose = require('mongoose')

//= =---------------------------------------------------= =//
// ---== Define the BookRatingSchema
//= =---------------------------------------------------= =//
const bookRatingSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  rate: {
    type: Number,
    min: 0,
    max: 5,
    required: true
  },
  voter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})
//= =---------------------------------------------------= =//

//= =---------------------------------------------------= =//
// ---== Define the BookSchema
//= =---------------------------------------------------= =//
const bookSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  release_date: {
    type: Date,
    required: true
  },
  ratings: {
    type: [bookRatingSchema],
    required: true
  }
})
//= =---------------------------------------------------= =//

module.exports = mongoose.model('Book', bookSchema)
