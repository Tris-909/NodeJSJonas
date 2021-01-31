const Tour = require('../models/tour.js');

exports.aliasTours = async (req, res, next) => {
    req.query.limit = 5;
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
}

exports.getAllTours = async (req, res) => {
    try {
        const queryObj = { ...req.query };
        // REMOVE THESE QUERY STRING IF POSSIBLE BECAUSE YOU WILL DO THIS SEPARATELY
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);

        // FILTER BY GREATER THAN AND LITTLE THAN A CERTAIN VALUE
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte?|lte?)\b/g, match => `$${match}`);

        let query = Tour.find((JSON.parse(queryStr)));
        
        // SORTING
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            /// Example : ?sort=price,-ratingsAverage
            // Sort in Mongoose works like : .sort('-price ratingAverage') with `-` for From the biggest to smallest
            query = query.sort(sortBy);
        } else {
            // Get the newest first by default
            query = query.sort('-createdAt');
        }

        // SELECTED FIELDS
        if (req.query.fields) {
            let fields = req.query.fields.split(',').join(' ');
            query = query.select(fields);
        } else {
            //default 
            query = query.select('-__v');
        }

        // PAGINATION SYSTEM
        const page = req.query.page*1 || 1;
        const limit = req.query.limit*1 || 3;
        const skip = (page - 1)*limit;
        console.log(skip);
        query = query.skip(skip).limit(limit);

        if (req.query.page) {
            const numTours = await Tour.countDocuments();
            console.log(skip >= numTours);

            if (skip >= numTours) {
                res.status(404).send('This Page does not exist');
            } 
        }

        const allTours = await query;
        res.status(200).send(allTours);
    } catch(error) {
        throw new Error('Something is wrong please try again');
    }
}

exports.getTourById = async (req, res) => {
    try {
        const singleTour = await Tour.findById(req.params.id);
        if (singleTour) {
            res.status(200).send(singleTour);
        } else {
            throw new Error('This Tour is not existed');
        }
    } catch(error) {
        res.status(400).send(error.message);
    }
};

exports.createNewTour = async (req, res) => {
    try {
        const newTour = await Tour.create(req.body);
        res.status(201).send(newTour);
    } catch(error) {
        res.status(400).send(error.message);
    }
}

exports.changeTourInfo = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);

        if (tour) {
            const name = req.body.name || tour.name;
            const rating = req.body.rating || tour.rating;
            const price = req.body.price || tour.price;

            tour.name = name;
            tour.rating = rating;
            tour.price = price;

            tour.save();
            res.status(200).send(tour);
        } else {
            throw new Error('This Tour is not existed');
        }
    } catch(error) {
        res.status(400).send(error.message);
    }
}

exports.deleteATour = async (req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id);
        res.status(200).send('Delete Tour Successfully');
    } catch(error) {
        res.status(404).send(error.message);
    }
}