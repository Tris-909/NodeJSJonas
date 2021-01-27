const express = require('express');
const userController = require('../controller/user.js');

const Router = express.Router();

Router.route('/')
    .get(userController.getUsers)
    .post(userController.createUser);

Router.route('/:id')
    .get(userController.getSingleUser)
    .patch(userController.changeAUserInfo)
    .delete(userController.deleteAUser);

module.exports = Router;