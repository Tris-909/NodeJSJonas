const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'A tour must have a NAME']
    },
    duration: {
        type: Number,
        required: true
    },
    maxGroupSize: {
        type: Number,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    ratingsAverage: {
        type: Number,
        default: 0
    },
    ratingsQuantity: {
        type: Number
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    summary: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true
    },
    imageCover: {
        required: true,
        type: String
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    startDates: [Date]
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;