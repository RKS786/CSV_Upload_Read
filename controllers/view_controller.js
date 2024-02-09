const fs = require('fs');
const csvFileDB = require('../models/csv_db');
const csvParser = require('csv-parser');

module.exports.view = async (req, res) => {
    try {
        // Find the CSV file by its ID from the database
        let viewFile = await csvFileDB.findById(req.params.id);
        const header = []; // Array to store CSV header
        const result = []; // Array to store CSV data rows

        const pageSize = 99; // Number of records per page
        const pageNumber = req.query.page || 1; // Current page number, defaults to 1 if not provided

        // Read the CSV file as a stream and parse it using csv-parser
        fs.createReadStream(viewFile.FilePath)
            .pipe(csvParser())
            .on('headers', (headers) => {
                // Store the CSV headers in the 'header' array
                header.push(...headers);
            })
            .on('data', (data) => {
                // Push each row of CSV data into the 'result' array
                result.push(data);
            })
            .on('end', () => {
                // Calculate the start and end index of the data slice for pagination
                const startIndex = (pageNumber - 1) * pageSize;
                const endIndex = pageNumber * pageSize;
                // Extract the subset of data for the current page
                const slicedData = result.slice(startIndex, endIndex);

                // Render the 'View' template with the retrieved data and pagination information
                res.render('View', {
                    title: 'File View',
                    FileName: viewFile.FileName,
                    head: header, // Pass the CSV headers to the template
                    data: slicedData, // Pass the subset of CSV data to the template
                    length: result.length, // Total number of rows in the CSV file
                    currentPage: pageNumber, // Current page number
                    totalPages: Math.ceil(result.length / pageSize), // Total number of pages
                    pageSize: pageSize // Number of records per page
                });
            });
    } catch (error) {
        console.log('Error in Viewing File ', error);
        return res.status(500).send('Internal server error');
    }
}
