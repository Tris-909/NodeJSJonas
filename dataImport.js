const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');
const Tour = require('./models/tour.js');

dotenv.config({ path: './config.env' });

mongoose.connect(process.env.DATABASES, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}, () => {
    console.log('Connected to mongoDB successfully');
});

const tours = JSON.parse(fs.readFileSync('./controller/tours-simple.json', 'utf-8'));

const importData = async () => {
    try {
        await Tour.create(tours);
        console.log('Data Imported');
    } catch(error) {
        console.log(error.message);
    }
}

const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log('Data Imported');
    } catch(error) {
        console.log(error.message);
    }
}

if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
}
