const express = require('express');
const tourController = require('../controller/tour.js');

const router = express.Router();

router.param('id', tourController.checkID);

router.route('/')
    .get(tourController.getAllTours)
    .post(tourController.createNewTour);

router.route('/:id')
    .get(tourController.getTourById)
    .patch(tourController.changeTourInfo)
    .delete(tourController.deleteATour);

module.exports = router;