const axios = require('axios');
const functions = {
        add: (x,y) => x+y,
        getUser: async () => {
        const user = await axios.get('https://jsonplaceholder.typicode.com/users/1')
        return user
        },
	getBooks: async () => {
        const books = await axios.get('http://localhost:5000/api/books/')
        return books
        },
        
};
module.exports = functions;
