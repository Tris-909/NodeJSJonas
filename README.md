# NodeJSJonas

- NodeJS from Udemy Jonas Schmedtmann. I will only document what I don't know or what I think it's important for the sake of re-reading all this valuable material.

### How to run a javascript file in the terminal using NodeJS ?

- node index.js

- Watch Mode : nodemon index.js

### How to read and write files using NodeJS ?

```javascript
const fs = require('fs');
fs.readFileSync(path, 'utf-8');
```

- path : a string that lead to the file that you want to.
- utf-8 : define type of data you expect inside that file. utf-8 is just an example

### SetUp Express and some important features of Express

- npm i express nodemon

- Then write your basic server in your main file index.js :

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Create first API successfully');
});

app.listen(5000, () => {
  console.log('Your Server is running on port 5000');
});
```

- URL Parameters : Sending data through URL (the link below is just an example)

```javascript
app.post('/api/v1/tours/:id', (req, res) => {
  console.log(req.params.id);
  res.send('Send');
});
```

- /:id -> Syntax for URL Parameters in this occassion, req.params returns {id: }

- Router in ExpressJS (All the URL is just examples)

```javascript
const Handler = () => {}; // Function
const HandlerThatUseId = () => {}; // Another Function
const Router = express.Router();
Router.route('/').get(Handler);
Router.route('/:id').get(HandlerThatUseId);
app.use('/api/v1/smth', Router);
```

- Connecting with MongoDB using Mongoose :

  - First, Create a MongoDB account with a cluster that contain `links` to connect to your databases through mongoDB Compass
  - Installing Mongoose then go to your NodeJS main files and :

  ```
  const mongoose = require('mongoose');
  ...
  mongoose.connect(process.end.DATABASES, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }, (connection) => {
    console.log('Connect to the databases successfully');
  });
  ```

  - process.end.DATABASES prefers to environment variable : DATABASES

- Create a mongoose SCHEMA (schema is something to describe how you will structure your data in a collection) :

  - You can create a directory named Models and create a file that have the name of the same collection name in there. Then you can do this :

  ```javascript
  const mongoose = require('mongoose');
  const tourSchema = new mongoose.Schame({
    name: {
      required,
      type: string,
      unique,
    },
    price: Number,
  });
  const Tour = mongoose.model('Tour', tourSchema);
  module.exports = Tour;
  ```

  - the 'model' function of Mongoose will create a model in databases once it connected that has a name like the first parameter but have a 's' after that and the second parameter is for define your schema for that model.

- Query Strings : A way to passing data through URL. QueryString starts with ?key=value&key2=value2 and so on. In the Router where you take in the request, you can access to these querystring data using req.query

- Pre and Post middlewares : 'save' hook is something you can change based on when you want the middleware to run

  ```javascript
  tourSchema.pre('save', function (next) {
    next();
  });

  tourSchema.post('save', function (next) {
    next();
  });
  ```
