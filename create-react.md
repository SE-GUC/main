# How to run your react app inside your server directory?

1. Cd to your main directory
2. Rename your index.js to server.js
3. In your `package.json` rename all occurences of index to server
4. Type the following command `create-react-app client`
5. Cd client
6. Create a .env file and add the following line `SKIP_PREFLIGHT_CHECK=true`
7. Delete node_modules and package-lock.json **IN YOUR CLIENT DIRECTORY ONLY**
8. Cd back to your server directory and add the following to your package.json
```js
 "scripts": {
    "client-install": "npm install --prefix client",
    "start": "node server",
    "server": "nodemon server",
    "test": "jest",
    "client": "npm start --prefix client",
    "dev": "concurrently \"npm run server\" \"npm run client\""
  },
  ```
9. Type the following in your terminal  `npm i concurrently --save`
10. Type the following in your terminal  `npm i`
11. Type the following in your terminal  `npm run client-install`
12. Type the following in your terminal  `npm run dev`
13. By now, you should see that your server is running and that your react app is running
    
    
