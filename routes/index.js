// Imports the Express.js framework
const express = require('express');

// Creates an instance of the Express router
const router = express.Router();

// Imports multer for handling file uploads
const multer = require('multer');
const upload = multer({ dest:'uploadFiles' }); // Sets the destination directory for file uploads

// Imports the CSV file model
const csvFileDB = require('../models/csv_db');

// Imports the home and view controllers
const homeController = require('../controllers/home_controller');
const viewController = require('../controllers/view_controller');

console.log('router loaded'); // Logs a message indicating that the router is loaded

// -------- Get Requests ---------
// Defines the route for the home page and associates it with the home controller's home method
router.get('/', homeController.home);
// Defines the route for deleting a file and associates it with the home controller's delete method
router.get('/delete/:id', homeController.delete);
// Defines the route for viewing a file and associates it with the view controller's view method
router.get('/view/:id', viewController.view);

// -------- Post Requests ---------
// Defines the route for uploading a file and associates it with the home controller's upload method
router.post('/upload', upload.single('file'), homeController.upload);

module.exports = router; // Exports the router for use in other modules
