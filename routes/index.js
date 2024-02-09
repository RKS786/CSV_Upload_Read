//imports the Express.js framework
const express = require('express');

//creates an instance of the Express router
const router = express.Router();

//The require() function is used to import the router modules defined in separate files
//const homeController = require('../controllers/home_controller');

console.log('router loaded')

//When a GET request is made to '/', it invokes the home function from the homeController
//router.get('/', homeController.home);

module.exports = router;