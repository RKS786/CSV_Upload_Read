//imports the Express.js framework
const express = require('express');

//creates an instance of the Express router
const router = express.Router();

const multer = require('multer');
const upload = multer({ dest:'uploadFiles' })

//The require() function is used to import the router modules defined in separate files
const homeController = require('../controllers/home_controller');
const viewController = require('../controllers/view_controller')

console.log('router loaded')

//When a GET request is made to '/', it invokes the home function from the homeController
router.get('/', homeController.home);
router.get('/delete/:id', homeController.delete);
router.get('/view/:id', viewController.view);

router.post('/upload',upload.single('file'), homeController.upload);

module.exports = router;