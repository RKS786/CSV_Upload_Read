const csvFile = require('../models/csv_db'); // Importing the CSV file model
const fs = require('fs'); // Importing the file system module
const path = require('path'); // Importing the path module

// Controller function for rendering the home page
module.exports.home = async (req, res) => {
    try {
        // Finding all files in the CSV file model
        let files = await csvFile.find({});

        // Rendering the home page view with file data
        return res.render('home', {
            title: 'Home',
            Files: files,
        });
    } catch (error) {
        console.log('Error in homeController ', error); // Logging any errors
    }
};

// Controller function for uploading a file
module.exports.upload = async (req, res) => {
    try {
        // Checking if a file is uploaded
        if (!req.file) {
            return res.status(400).send('Please Upload a file!');
        }

        // Checking if the uploaded file is a CSV file
        if (!req.file.mimetype.startsWith('text/csv')) {
            return res.status(400).send('Please select CSV files only!');
        }
        
    } catch (error) {
        console.log('Error in uploading files', error); // Logging any errors
    }

    // Extracting file details from the request
    const { originalname, path, filename } = req.file;

    // Creating a new entry for the uploaded file in the CSV file model
    const file = await csvFile.create({
        FileName: originalname,
        FilePath: path,
        File: filename
    });

    return res.redirect('/'); // Redirecting back to the home page
}

// Controller function for deleting a file
module.exports.delete = async (req, res) => {
    try {
        // Finding the file by its ID
        let isFile = await csvFile.findById(req.params.id);

        // Handling case when file not found
        if (!isFile) {
            console.log("File not found");
            return res.redirect("/");
        }

        // Removing the file from the database
        await csvFile.findByIdAndDelete(req.params.id);

        // Removing the file from the file system
        const filePath = path.join(__dirname, "../uploadFiles", isFile.File);

        fs.unlink(filePath, function (err) {
            if (err) {
                console.error("Error deleting file:", err);
                return res.redirect("/");
            } else {
                console.log("File deleted successfully");
                return res.redirect("/");
            }
        });
    } catch (error) {
        console.log("Error in deleting file :", error); // Logging any errors
        res.status(500).send('Internal server error'); // Sending internal server error status
    }
}
