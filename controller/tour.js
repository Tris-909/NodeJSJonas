const Tour = require('../models/tour.js');
const APIFeatures = require('../utils/apifeatures.js');

exports.aliasTours = async (req, res, next) => {
    req.query.limit = 5;
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
}

exports.getAllTours = async (req, res) => {
    try {
        const features = new APIFeatures(Tour.find(), req.query).filter().sort().fields().paginate();
        const allTours = await features.query;
        res.status(200).json({
            status: 'success',
            length: allTours.length,
            data: {
                allTours
            }
        });
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

exports.getTourStarts = async (req, res) => {
    try {
        const stats = await Tour.aggregate([
            {
                $match: { ratingsAverage: { $gte: 4.5 } }
            },
            {
                $group: { 
                    _id: '$difficulty',
                    numTours: { $sum: 1 },
                    numRatings: { $sum: '$ratingsQuantity' },
                    avgRating: { $avg: '$ratingsAverage' },
                    avgPrice: { $avg: '$price' },
                    minPrice: { $min: '$price' },
                    maxPrice: { $max: '$price' } 
                }
            },
            {
                $sort: {
                    avgPrice: 1
                }
            },
            {
                $match: {
                    _id: { $ne: 'easy' }
                }
            }
        ]);

        res.status(200).json({
            status: 'success',
            data: {
                stats
            }
        })
    } catch(error) {
        res.status(404).send(error.message);
    }
}

exports.getMonthlyPlan = async (req, res) => {
    try {
        const year = req.params.year * 1;
        const plan = await Tour.aggregate([
            {
                $unwind: '$startDates'
            },
            {
                $match: {
                    startDates: {
                        $gte: new Date(`${year}-01-01`),
                        $lte: new Date(`${year}-12-31`) 
                    }
                }
            },
            {
                $group: {
                    _id: { $month: '$startDates' },
                    numOfTours: { $sum: 1 },    
                    tours: { $push: '$name' }
                }
            },
            {
                $addFields: {
                    month: '$_id'
                }
            },
            {
                $project: {
                    _id: 0
                }
            },
            {
                $sort: {
                    numOfTours: -1                   
                }
            },
            {
                $limit: 12
            }
        ]);

        res.status(200).json({
            status: 'success',
            data: {
                plan
            }
        });
    } catch(error) {
        res.status(404).send(error.message);
    }
}