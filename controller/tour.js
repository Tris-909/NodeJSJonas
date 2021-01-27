const fs = require('fs');
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`));

exports.checkID = (req, res, next, val) => {
    console.log((val * 1)> tours.length);
    if ((val*1)> tours.length) {
        return res.send('Invalid ID');
    }

    next();
}

exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    });
}

exports.getTourById = (req, res) => {
    let theTour = tours.find(tour => tour.id == req.params.id);
    res.status(201).send(theTour)
};

exports.createNewTour = (req, res) => {
    const newId = tours[tours.length-1].id + 1;
    const newTour = Object.assign({id: newId}, req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).send(newTour);
    });
}

exports.changeTourInfo = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here...>'
        }
    })
}

exports.deleteATour = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: null
    });
}