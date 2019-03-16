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
// This file (api/v1/middlewares/Logger.js)
// is defining a logger class and a mongo log schema
// Any call to Logger.log will insert a new log record
// to the connected mongo database
// Keep the schema light to reduce the disk space used
//= =---------------------------------------------------= =//

const mongoose = require('mongoose')

//= =---------------------------------------------------= =//
// ---== Define MongoDb Log Schema & Model
//= =---------------------------------------------------= =//
const logSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  message: String,
  timestamp: Date
})
const Log = mongoose.model('Log', logSchema)
//= =---------------------------------------------------= =//

//= =---------------------------------------------------= =//
// ---== Logger class
//= =---------------------------------------------------= =//
class Logger {
  static log (msg) {
    try {
      new Log({
        _id: mongoose.Types.ObjectId(),
        message: msg,
        timestamp: Date.now().toString()
      }).save()
    } catch (err) {
      console.log(err)
    }
  }
}
//= =---------------------------------------------------= =//

module.exports = Logger
