# Getting Started
1. Create a new file called `.env` to config your server, here is an example
```
PORT = 7000
MONGO_DNS_SRV = "mongodb+srv://"
MONGO_AUTH = "username:password"
MONGO_CLUSTER = "@cluster0.mongodb.net/"
MONGO_DB_NAME = "test"
MONGO_OPTIONS = "?retryWrites=true"
```
2. run `npm i` to install the dependencies
3. Ready ! run server with `npm run start` check the scripts in `package.json` for more options

# Endpoints
- /api/v1/users
    - POST `//=> create a new user`
        - !name: string().min(2)
        - !birthdate: string().length(10) `//=> YYYY-MM-DD example "1999-01-31"`
        - !gender: string().valid(['male', 'female'])
    - GET `//=> get list of all users`
        
- /api/v1/users/:id
    - GET `//=> get a single user info`
    - PUT `//=> update a single user info`
        - name: string().min(2)
        - birthdate: string().length(10) `//=> YYYY-MM-DD example "1999-01-31"`
        - gender: string().valid(['male', 'female'])
    - DELETE `//=> delete a single user`

- /api/v1/books
    - POST `//=> create a new book`
        - !title: string().min(2)
        - !author: string().min(2)
        - !release_date: string().length(10) `//=> YYYY-MM-DD example "1999-01-31"`
        - ratings: [
            - !rate: number().min(0).max(5)
            - !voter: string().length(24) `//=> the id of the user who votes`
        - ]
    - GET `//=> get list of all books`

- /api/v1/books/:id
    - GET `//=> get a single book info`
    - PUT `//=> update a single book info`
        - title: string().min(2)
        - author: string().min(2)
        - release_date: string().length(10) `//=> YYYY-MM-DD example "1999-01-31"`
        - ratings: [
            - !rate: number().min(0).max(5)
            - !voter: string().length(24) `//=> the id of the user who votes`
        - ]
    - DELETE `//=> delete a single book`

- /api/v1/books/:id/vote
    - POST `//=> create a new vote`
        - !rate: number().min(0).max(5)
        - !voter: string().length(24) `//=> the id of the user who votes`
    - PUT `//=> update a vote info`
        - rate: number().min(0).max(5)
        - voter: string().length(24) `//=> the id of the user who votes`
