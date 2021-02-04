const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'A tour must have a NAME'],
        trim: true,
        maxlength: 50,
        minlength: 6
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
        default: 0,
        validate: {
            validator: function(val) {
                return val < this.price;
            },
            message: 'Discount price should always higher than displayed price'
        }
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
    slug: {
        type: String
    },
    startDates: [Date],
    secretTour: {
        type: Boolean,
        default: false
    }
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});

tourSchema.virtual('durationWeeks').get(function() {
    return this.duration / 7;
});

// DOCUMENT MIDDLEWARES: only runs before .save() and .create()
// tourSchema.pre('save', function(next) {
//     this.slug = slugify(this.name, {lower: true});
//     next();
// });

// tourSchema.post('save', function(doc, next) {
//     next();
// });

tourSchema.pre(/^find/, function(next) {
    this.find({
        secretTour: {$ne: true}
    }); 
    next();
});

tourSchema.post(/^find/, function(docs, next) {
    console.log(docs);
    next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;