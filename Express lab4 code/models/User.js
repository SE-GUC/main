const uuid = require('uuid')

// The User Model
class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.id = uuid.v4();
    };
};

module.exports = User

