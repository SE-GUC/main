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
// This file (api/v1/tests/AbstractTests.js)
// defines an abstract class for testing entities
//= =---------------------------------------------------= =//

//= =---------------------------------------------------= =//
//= =--- AbstractTests class
//= =---------------------------------------------------= =//
class AbstractTests {
  constructor (PORT, ROUTE) {
    if (this.constructor === AbstractTests) {
      // Error Type 1. AbstractTests class can not be constructed.
      throw new TypeError('Can not construct AbstractTests class.')
    }
    // else (called from child)
    // Check if all instance methods are implemented.
    if (this.runIndependently === AbstractTests.prototype.runIndependently) {
      // Error Type 4. Child has not implemented this abstract method.
      throw new TypeError('Please implement AbstractTests method runIndependently.')
    }
    if (this.runDependently === AbstractTests.prototype.runDependently) {
      // Error Type 4. Child has not implemented this abstract method.
      throw new TypeError('Please implement AbstractTests method runDependently.')
    }
    if (this.postRequestIndependently === AbstractTests.prototype.postRequestIndependently) {
      // Error Type 4. Child has not implemented this abstract method.
      throw new TypeError('Please implement AbstractTests method postRequestIndependently.')
    }
    if (this.getRequestIndependently === AbstractTests.prototype.getRequestIndependently) {
      // Error Type 4. Child has not implemented this abstract method.
      throw new TypeError('Please implement AbstractTests method getRequestIndependently.')
    }
    if (this.putRequestIndependently === AbstractTests.prototype.putRequestIndependently) {
      // Error Type 4. Child has not implemented this abstract method.
      throw new TypeError('Please implement AbstractTests method putRequestIndependently.')
    }
    if (this.deleteRequestIndependently === AbstractTests.prototype.deleteRequestIndependently) {
      // Error Type 4. Child has not implemented this abstract method.
      throw new TypeError('Please implement AbstractTests method deleteRequestIndependently.')
    }
    if (this.postRequestDependently === AbstractTests.prototype.postRequestDependently) {
      // Error Type 4. Child has not implemented this abstract method.
      throw new TypeError('Please implement AbstractTests method postRequestDependently.')
    }
    if (this.getRequestDependently === AbstractTests.prototype.getRequestDependently) {
      // Error Type 4. Child has not implemented this abstract method.
      throw new TypeError('Please implement AbstractTests method getRequestDependently.')
    }
    if (this.putRequestDependently === AbstractTests.prototype.putRequestDependently) {
      // Error Type 4. Child has not implemented this abstract method.
      throw new TypeError('Please implement AbstractTests method putRequestDependently.')
    }
    if (this.deleteRequestDependently === AbstractTests.prototype.deleteRequestDependently) {
      // Error Type 4. Child has not implemented this abstract method.
      throw new TypeError('Please implement AbstractTests method deleteRequestDependently.')
    }

    this.base_url = `http://localhost:${PORT}/api/v1${ROUTE}`
    this.sharedState = {}
    this.runIndependently = this.runIndependently.bind(this)
    this.runDependently = this.runDependently.bind(this)
    this.postRequestIndependently = this.postRequestIndependently.bind(this)
    this.getRequestIndependently = this.getRequestIndependently.bind(this)
    this.putRequestIndependently = this.putRequestIndependently.bind(this)
    this.deleteRequestIndependently = this.deleteRequestIndependently.bind(this)
    this.postRequestDependently = this.postRequestDependently.bind(this)
    this.getRequestDependently = this.getRequestDependently.bind(this)
    this.putRequestDependently = this.putRequestDependently.bind(this)
    this.deleteRequestDependently = this.deleteRequestDependently.bind(this)
  }

  // An abstract methods.
  runIndependently () {
    expect(1).toBe(1)
  }

  runDependently () {
    expect(1).toBe(1)
  }

  postRequestIndependently () {
    // Error Type 6. The child has implemented this method but also called `super.postRequestIndependently()`.
    throw new TypeError('Do not call abstract method postRequestIndependently from child.')
  }

  getRequestIndependently () {
    // Error Type 6. The child has implemented this method but also called `super.getRequestIndependently()`.
    throw new TypeError('Do not call abstract method getRequestIndependently from child.')
  }

  putRequestIndependently () {
    // Error Type 6. The child has implemented this method but also called `super.putRequestIndependently()`.
    throw new TypeError('Do not call abstract method putRequestIndependently from child.')
  }

  deleteRequestIndependently () {
    // Error Type 6. The child has implemented this method but also called `super.deleteRequestIndependently()`.
    throw new TypeError('Do not call abstract method deleteRequestIndependently from child.')
  }

  postRequestDependently () {
    // Error Type 6. The child has implemented this method but also called `super.postRequestDependently()`.
    throw new TypeError('Do not call abstract method postRequestDependently from child.')
  }

  getRequestDependently () {
    // Error Type 6. The child has implemented this method but also called `super.getRequestDependently()`.
    throw new TypeError('Do not call abstract method getRequestDependently from child.')
  }

  putRequestDependently () {
    // Error Type 6. The child has implemented this method but also called `super.putRequestDependently()`.
    throw new TypeError('Do not call abstract method putRequestDependently from child.')
  }

  deleteRequestDependently () {
    // Error Type 6. The child has implemented this method but also called `super.deleteRequestDependently()`.
    throw new TypeError('Do not call abstract method deleteRequestDependently from child.')
  }
}
//= =---------------------------------------------------= =//

module.exports = AbstractTests
