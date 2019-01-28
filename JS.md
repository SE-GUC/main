# A beginner's introduction to Javascript 🚀 💻

![JS Logo](https://logonoid.com/images/javascript-logo.png)

## What is Javascript?
Javascript (JS) is an interpreted, dynamic, weakly-typed, single-threaded, asynchronous language. It’s always identified as a multi-paradigm language as it supports Object-Oriented, Functional and Event-Driven programming styles.

## Why JS?
One area where JS dominates is the web. For any web page to look and behave the way it does, three elements come into play:

* HTML
> The content of the webpage is created using HTML
* CSS
> The appearance and style of the content is achieved using CSS
* JS
> The role of JS is to serve dynamic content, manipulate values and make the pages interactive and responsive

Historically JS was only used in client-side functionalities. But, with the introduction of [Node.js](https://nodejs.org/), it can now be used both at client-side and server-side. It’s lightweight, easy to learn, easy to implement and it’s supportive open-source community along with the fact that new developers need to learn only one language for both the frontend and the backend made JS a hot topic in recent years.

> It’s important to note that JS is an implementation of the [ECMAScript](https://www.ecma-international.org/) standard.

Hence, many versions exist of JS. The versions that are most famous within the developers' community and widely supported by browsers are ES6 (ES2015) and beyond.

### Types

JS is weakly-typed which means that variable declaration does not require a type.

```javascript
let num = 5;
const word = 'Hi'
var greeting = "Hello"
let flag = true
```

> In JS if a line of code contains only one statement then the `;` could be omitted.


### Variable scope

There are three keywords to declare a variable in JS: 
* let
> let has a blocked-scope
* var 
> var has a function scope if defined within a function or a global scope if defined outside all functions
* const
> const dentoed a variable with a value that will **NOT** change


```javascript

function scopeExample() {

    var arr = [1,2,3,4]
    var globalCounter= 0
    for( let localCounter = 0; localCounter< arr.length; localCounter++ ) {
        globalCounter++
        // here we can access localCounter and globalCounter
        }
    console.log(globalCounter)
    // prints out 4
    console.log(localCounter)
    // error as localCounter's scope is restrained to the for loop
}

```

```javascript

const e = 2.18
e = 1.2 // error

```

### Operations

```javascript

let x = 5
let y = 2
let sum = x + y // 7
let product = x * y // 10
let power = x ** y // 25


let word1 = 'Software'
let word2 = 'Engineering'
let word3 = word1 + word2 // Software Engineering
```

### Objects

Creating objects in JS is really straight forward. 

```javascript

var employee = {}

```

This seemingly very simple line of code creates an empty object. But in general objects can hold any number of key-value pairs.

```javascript

var person = {
    name: 'Tywin',
    house: 'Lannister',
    age: 57,
    hobbies: ['hunting', 'planning to kill other people', 'horse riding'],
    isMarried: false
}

```

The above snippet creates an object stored in a variable called person:older_man:. The attributes of the object are name, house, age, hobbies and finally isMarried. The values of these attributes can be of any type as JS is weakly-typed.

### :warning: == vs ===

In most cases JS follows the same conventions as other languages like Java or Python. But, when it comes to the equality comparison `==` JS sometimes behaves in a not-so-traditional manner.

> In JS `===` and `!==` work as you'd expect

> In JS `==` and `!=` work as you'd expect when operands are of the same type. But, if the operands are not of the same type they attempt to coerce the values.

#### Examples of ==:

* ` '' == 0 // false `
* ` 0 == '' // true `
* ` 0 == '0' // true `
* ` false == 'false' // false` 
* ` false == '0' // true `
* ` false == undefined // false `
* ` false == null // false `
* ` null == undefined // true `



## :hammer: Functions

Functions play a major role in JS as it supports the functional programming paradigm. Functions are pieces of code that are reusable and they provide a cleaner more modular structure for our code. Functions could return a value or they could return no value, similar to a function of type `void` in Java.

```javascript

function helloWorld() {
    console.log('Hello, World')
}

function sum(x,y) {
    return x+y 
}

helloWorld() // prints 'Hello, World' to the console
let result = sum(2,3) // result = 5 but nothing is shown to the console

```

### Functions as Objects

In JS, functions could also considered as objects. Hence, they could be passed as arguments, assigned to a variable and so on.

```javascript

const helloWorld = function () {
    console.log('Hello, World')
}

const sum = function(x,y) {
    return x+y 
}

helloWorld() // prints 'Hello, World' to the console
let result = sum(2,3) // result = 5 but nothing is shown to the console

```

### :arrow_right: Arrow Functions

Arrow functions are an alternative way to defining functions in JS that was introduced with ES6, and it is very widely used in modern JS development.

```javascript

const helloWorld = () => { 
    console.log('Hello, World')
}

const sum = (x,y) => { 
    return x+y
}

```
> To create an arrow function simply omit the keyword `function` replace it with `(any number of arguments) =>` 

### :telephone_receiver: Callbacks 

In JS as I previously mentioned, we can pass functions as arguments to other functions and call functions from within functions.

> A function that accepts another function as an argument is called a higher order function

> A function that is passed as an argument to another function is called a callback function

```javascript
function logger() {
    console.log('Hello World 1')
}

const loggerAsFunc = function() {
    console.log('Hello World 2')
}

const loggerAsArrow = () => {
    console.log('Hello World 3')
}

function takesCB(cb) {
    cb()
}
takesCB(logger) // Hello World 1
takesCB(loggerAsFunc) // Hello World 2
takesCB(loggerAsArrow) // Hello World 3
```

In the previous example we have a function `takesCB(cb)` that accepts a callback function as an argument and it simply executes it.

```javascript
const finish = () => { console.log('Finished work') }

const work = (activity, callback) => {
    console.log(`I am currently ${activity}`)
    callback() 
}

work('drawing', finish) // I am currently drawing
                        // Finished work
```

In the last snippet, finish is just a simple function that prints `Finished work` to the console. On the other hand, work is a function that accepts two arguments: `activity`, typically we expect it to be a string and `callback`, typically we expect it to be a function. The last line of code makes a function call with the arguments `'drawing'` and the function `finish`

### Why Callbacks?

Callback functions are essential to JS as it's asynchronous. What this means is that not all functions will be executed in the order they appear unlike most traditional programming languages. 


```javascript
var user = db.getUser() // A function that will take a long time as it will open a connection with the database
console.log(user) // prints undefined as the value of the variable user is still undefined
```
Since JS is single threaded the main event loop does not allow any operations that will take a long time to block the rest of the operations. Hence operations like I/O, API requests and `setTimeout()` will be scheduled on a seprate "Tasks queue" that will run in the background while the main event loop keeps executing commands on the main thread.

> NOTE: :timer_clock: Operations that take a 'long' time, usually take few hundereds milliseconds.

```javascript
const helloWorld = () => { console.log('Hello World') }
const takesLongTime = (func) => { setTimeout(func,1000)}
takesLongTime(helloWorld)
// We expect this to be printed after Hello World
// But Hi will be printed first
console.log('Hi')
// Output
// Hi
// Hello World
```

In the previous snippet, `helloWorld()` is just a function that prints `'Hello World'`, `takesLongTime()` is a function that accepts one input and then calls the predefined `setTimeout()` with the input and a delay of a 1000 ms. 
In other words, `takesLongTime()` executes whatever function is passed after 1 second. Hence, the event loop will continue  executing commands on the main thread in order not to block the rest of our code. Consequently the `console.log('Hi')` will be executed first followed by the delayed command.

> Callbacks are a way to ensure that our code is executed in the order that we intend

#### Example:
We're designing a simple book store application. We want to allow the users to search for books by author. The user enters the author's name and our application searches the backend for all books written by this author. Below are two possible versions that we might implement. Version 1 will not work for the same reason `'Hi'` was printed first in the previous example.

```javascript
// Version 1
const searchBooksByAuthor = (bookAuthor) => { 
    var books = db.find(bookAuthor) // Query the database
    return books // db.find takes a long time and the variable 'books' does not contain the values we expect
}
console.log(searchBooksByAuthor('Charles Dickens'))
// Output --> undefined
```


```javascript
// Version 2
const searchBooksByAuthor = (bookAuthor, cb) => { 
    db.find(bookAuthor,cb) // Query the database 
                          // But this time pass a callback function to be executed after the query has returned
}
const handleReturnOfBooks = (books) => {
    console.log('Found books')
    console.log(books)
}

searchBooksByAuthor('Charles Dickens',handleReturnOfBooks)
// Output --> ['A Tale of Two Cities', 'Great Expectations', 'Oliver Twist']
```
> As you might have expected, handling complex chained queries and errors using callbacks will lead to unreadable hard to maintain code. This is why ES6 introduced [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) and ES7 introduced [Async/Await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function). Nevertheless callbacks as a concept are inseparable from the process of learning JS, for more info consult [Callback Hell](http://callbackhell.com/).

## :exclamation: Promises

> Promises represent the future result of an asynchronous operation
In other words a promise is an object that can be returned synchronously from an asynchronous function. 

A promise has one of three states:
* Pending
> A promise always starts as pending, it's outcome is not determined because the operation that will produce its result hasn’t completed yet
* Fulfilled
> The producing operation has completed (Promise was settled) and the promise has a value.
* Rejected 
> The producing operation failed, a promise has a reason that indicates why the operation failed.

The two most important promises' functions are `.then()` and `.catch()`, `.then()` contains the code to be executed on success while `.catch()` is executed whenever an error occurs. Promises provide a lot of advantages over traditional callbacks: they're easier to read, maintain and most importantly to deal with errors. Promises can be chained allowing for a number of `.then()`s with just one `.catch()`. Compare that to the callback hell where every callback had to handle any error that might occur within it's scope.

#### Example:

So assume we want to simulate a real-life scenario where we want to get some data from a remote server, we will use an open source fake [api](https://jsonplaceholder.typicode.com/) for this example. I will use the fetch method. The fetch method is predefined in JS, it accepts a url and then it peforms a request to the specified url.

```javascript
let url = 'https://jsonplaceholder.typicode.com/posts'
fetch(url) // Function that takes a long time, but instead of passing a callback for it, it returns a promise.
    .then(posts => posts.json()) 
    .then(postsAsJson => console.log(postsAsJson))
    .catch(err => console.log('Error while getting posts'))
```
`.then()` expects a function to be executed when the promise is resolved so we pass a simple function that accepts 1 argument that I called posts as we're expecting posts. Then we're invoking a predefined method `.json()` to the posts to transform it to json format. `.json()` returns a promise as well, hence we will chain promises having another `.then()` with another simple function that accepts 1 argument called `postsAsJson` and it just prints it out to the console. We have a single `.catch()` that will be invoked if any error occurred in either the `.fetch()` the first `.then()` or the second `.then()`.

> NOTE: the convention for naming the result of an api request is `res` I used `posts` to be clearer in the example
> NOTE: :warning: the `.catch()` method should handle an error and return an suitable message to the user, here I just printed a simple statemnet 

## :hourglass: Async/Await

Arguably the greatest introduction to JS that came with ES7 is async/await. The most recent way to deal with asynchronous functions, `async/await` is the easiest to understand, read and write.


```javascript
const searchBooksByAuthor = async (bookAuthor) => { 
    var books = await db.find(bookAuthor) // using keyword 'await' forces the code to wait for this operation to return. This allows us to write much cleaner code
    return books
}
console.log(searchBooksByAuthor('Charles Dickens'))
// Output --> ['A Tale of Two Cities', 'Great Expectations', 'Oliver Twist']
```

`async/await` allows us to choose when to block code and control the order of execution in a much simpler manner. Now, the question should be, how to handle errors? and the answer is really simple: the good old `try/catch`.


```javascript
const searchBooksByAuthor = async (bookAuthor) => { 
    try {
        var books = await db.find(bookAuthor) 
        return books
    }
    catch(err) {
    // handle any possible error and exit gracefully 
    }
    
}
```

## ES6+ Advanced Tips

### Templates

```javascript
let word1 = 'Ammar'
let word2 = 'Yasser'
let num1 = 2
let num2 = 3
const fullName1 = word1 + ' ' + word2 // The normal way to concatenate two strings 
const fullName2 = `${word1} ${word2}` // Using templates
var sum = num1 + num2
var result1 = 'The sum of ' + num1 + ' and ' + num2 ' is: ' + sum // How you'd usually display the result 
var result2 = `The sum of ${num1} and ${num2} is: ${num1+num2}` // Much simpler with templates
console.log(fullName1) // Ammar Yasser
console.log(fullName2) // Ammar Yasser
console.log(result1) // The sum of 2 and 3 is: 5
console.log(result2) // The sum of 2 and 3 is: 5
```

### Destructuring Objects

```javascript
// Assume we have the following object
const person = {
    name: 'Jon',
    house: 'Targaryan',
    job: 'King in the north',
    address: 'Winterfell'
}

//If we want to get the name of the person we might do something like the following
const name = person.name
// Same for any other attribute
const house = person.house // etc..

// Destructuring allows us to do the same in a much simpler cleaner way

const { name, house } = person

```
### Object Literal


```javascript

function nameMaker(code, title) {
   // return {code:code, title:title}
   // Both have the same effect as the object key we want to create is the same as the variable name.
   // return {code,title}
}
console.log(nameMaker('CSEN603', 'Software Engineering')) // Creates an object with two attributes code and title
// Output
// {
// code: 'CSEN603'
// title: 'Software Engineering'
// }

```

### For of Loop

For of loops allow us to loop over any iterable without indexing.

```javascript
let numbers = [1,2,3,4]
sum = 0
for(const number of numbers)
    sum+= number
```

> NOTE: :warning: For of loops are designed to iterate over values not to overwrite them.

### Spread Operator

The spread operator allows us to get all the 'values' stored in a variable and augment another variables with these values.

```javascript
let arr1 = [1,2,3,4]
let arr2 = [...arr1, 5]
console.log(arr1) // [1,2,3,4]
console.log(arr2) // [1,2,3,4,5]
let obj1 = {
    firstName: 'Ammar'
}
let obj2 = {
    ...obj1,
    secondName: 'Yasser'
}
console.log(obj1) // { firstName: 'Ammar' }
console.log(obj2) // = { firstName: 'Ammar', secondName: 'Yasser' }
```
### Rest Operator

The rest operator is similar to the spread operator. It 'more easily' handles various inputs as parameters to a function.

```javascript
const add1 = (nums) => {
    console.log(nums)
}
add1(1,2,3,4)
// prints out only 1 because it's expecting only one input
const add2 = (...nums) => {
    console.log(nums)
}
add2(1,2,3,4)
// prints out [1,2,3,4] 
```

### Default Params
```javascript
const sum = (arr) => {
    sum = 0
    arr.forEach( element => sum+=element)
    console.log(sum)
}
sum([1,2,3,4])
// prints out 10
// But, what if we do not pass an array?
sum()
//It throws an error
// Solution? set a default value for the 'arr' argument
const sum = (arr = []) => {
    sum = 0
    arr.forEach( element => sum+=element)
    console.log(sum)
}
sum() // prints out 0 instead of an error
```

### `includes()`

Previously if we wanted to check if an element occurs in an array or not we had to use `indexOf()` that returned the index of the element or -1 of it does not exist. Now, we can simply use the boolean method `includes()`.

```javascript
let arr = [1,2,3,4]
console.log( arr.includes(-1)) // false
console.log( arr.includes(1)) // true
```

### `forEach()`

`forEach()` is an array function that can be used instead of explicit `for` loops. It makes writing code cleaner and easier. `forEach()` accepts 1 input, namely 'element' and does 'something' for every element in the array

> In other words, `forEach()` accepts a function and executes it on every element in the array

```javascript
let arr = [1,2,3,4]
arr.forEach( elm => { console.log(elm) } ) 
// Output
// 1
// 2
// 3
// 4
sum = 0
arr.forEach( elm => { sum += elm } ) 
console.log(sum)
// Output 
// 10
```

### `map()`
`map()` is another very useful array function that is heavly used specially in [ReactJS](https://reactjs.org/). Unlike `forEach()` that does not return anything, `map()` returns an array. It executes a given functionality on the input array's elements one by one, appending the result of each operation to a new array.

```javascript
let arr = [1,2,3,4]
var result = arr.map( elm => { return elm*2 } )
console.log(result) [2,4,9,16]
```

> NOTE: the function used within the `map()` method **must** include a return statement 

### `filter()`

`filter()` performs a certain check on every element inside the input array and appends only those elements passing the check to the result array.

```javascript
let binary = [1,0,1,0,1]
let trueValues = binary.filter( (num) => {
    return num>0
})
console.log(trueValues) // [1,1,1]
```

```javascript
let names = ['Jon','Jaime','Cerci','Dany','Tyrion']
let namesWithC = names.filter( (name) => {
    return name.startsWith('C')
})
let namesWithJ = names.filter( (name) => {
    return name.startsWith('J')
})
console.log(namesWithC) // [ 'Cerci' ]
console.log(namesWithJ) // [ 'Jon' , 'Jaime' ]

```


> NOTE: the function used within the `filter()` method **must** include a boolean return statement
