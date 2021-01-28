const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const tourRouter = require('./routes/tourRoutes.js');
const userRouter = require('./routes/userRoutes.js');

// MIDDLEWARES
dotenv.config({ path: './config.env' });
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(`${__dirname}/public`));

// ROUTER
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

mongoose.connect(process.env.DATABASES, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}, (con) => {
    console.log('Connected to mongoDB successfully');
});

//SERVER
app.listen(5000, () => {
    console.log('SERVER IS RUNNING ON PORT ' + process.env.PORT);
});