const express = require('express');
const tourController = require('../controller/tour.js');

const router = express.Router();

router.route('/topTours').get(tourController.aliasTours, tourController.getAllTours);

router.route('/stats').get(tourController.getTourStarts);
router.route('/monthly/:year').get(tourController.getMonthlyPlan);

router.route('/')
    .get(tourController.getAllTours)
    .post(tourController.createNewTour);

router.route('/:id')
    .get(tourController.getTourById)
    .patch(tourController.changeTourInfo)
    .delete(tourController.deleteATour);

module.exports = router;