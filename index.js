const express = require('express');

// Working with API info
const morgan = require('morgan');

// Working with MongoDB
const mongoose = require('mongoose');

// Using environment variables 
const dotenv = require('dotenv');

// Routers
const tourRouter = require('./routes/tourRoutes.js');
const userRouter = require('./routes/userRoutes.js');

// Initialize the app
const app = express();

// MIDDLEWARES
dotenv.config({ path: './config.env' });
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(`${__dirname}/public`));

// ROUTER
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.all('*', (req, res) => {
    res.status(404).send('This Page is not avaialble, please try again');
});

mongoose.connect(process.env.DATABASES, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}, () => {
    console.log('Connected to mongoDB successfully');
});

//SERVER
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('SERVER IS RUNNING ON PORT ' + process.env.PORT);
});