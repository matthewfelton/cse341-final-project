// borrowers collection controller

// points variable to path of db connection information 
const mongodb = require('../db/connection');
// important ObjectId and allows single pull borrower to work and not error out and murder the server
const ObjectId = require('mongodb').ObjectId;

// pull all borrowers from db and creats an array using asynchronous fuction
const getAll = async (req, res, next) => {
    try {
        // Using MongoDB's async API to get the 'borrower' collection 
        const result = await mongodb.getDb().db().collection('borrower').find();
        
        // Converting the result to an array
        const lists = await result.toArray();

        // Setting the response header to indicate JSON content
        res.setHeader('Content-Type', 'application/json');
        
        // Sending a JSON response with the fetched borrower
        res.status(200).json(lists);
    } catch (error) {
        // Handle errors here
        console.error("Error fetching borrowers:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
const getSingle = async (req, res, next) => {
    // Extracting the borrower ID from the request parameters
    const borrowerId = new ObjectId(req.params.id);
    try {
        // Using MongoDB's async API to get the specified borrower by ID
        const result = await mongodb
            .getDb()
            .db()
            .collection('borrowers')
            .find({ _id: borrowerId });
    
        const lists = await result.toArray();
    
        if (lists.length > 0) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);
        } else {
            res.status(404).json({ error: 'borrower not found' });
        }
    } catch (error) {
        console.error('Error fetching single borrower:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// creates new borrower and sends to db
const newBorrower = async (req, res) => {
    try {
        const borrower = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dateBorrowed: req.body.dateBorrowed,
            inventoryBorrowed: req.body.inventoryBorrowed,
            dateDue: req.body.dateDue,
            conditionReturned: req.body.conditionReturned
        };
        const response = await mongodb.getDb().db().collection('borrower').insertOne(borrower);
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the borrower.');
        }
    } catch (error) {
        // Handle errors here
        console.error("Error creating borrower:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// update existing db
const updateBorrower = async (req, res) => {
    try {
      // Extracting borrower ID from the request parameters
    const borrower_Id = req.params.id;
      // Validate that borrower_id is a valid ObjectId before attempting to create ObjectId
    if (!ObjectId.isValid(borrower_Id)) {
        return res.status(400).json({ error: 'Invalid borrower ID format' });
    }
    const borrowerId = new ObjectId(borrower_Id);
      // Creating a borrower object from the request body
    const borrower = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateBorrowed: req.body.dateBorrowed,
        inventoryBorrowed: req.body.inventoryBorrowed,
        dateDue: req.body.dateDue,
        conditionReturned: req.body.conditionReturned
    };
      // Updating the borrower with the specified ID in the 'borrower' collection
    const response = await mongodb.getDb().db().collection('borrower').replaceOne({ _id: borrowerId }, borrower);
    console.log('Update Response:', response);
      // Responding with status 204 if the borrower is successfully updated
    if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
        // Responding with status 404 if the borrower does not exist
            res.status(404).json({ error: 'borrower not found' });
        }
    } catch (error) {
      // Log the error for troubleshooting
        console.error('Error in updateBorrowers:', error);
      // Responding with status 500 and an error message if there's an issue
        res.status(500).json({ error: 'Some error occurred while updating the borrower.' });
    }
};
// delete existing borrower
const deleteBorrrower = async (req, res) => {
    try {
      // Extracting borrower ID from the request parameters
    const borrower_Id = req.params.id;
      // Validate that borrowerId is a valid ObjectId before attempting to create ObjectId
    if (!ObjectId.isValid(borrower_Id)) {
        return res.status(400).json({ error: 'Invalid borrower ID format' });
    }
    const borrowerId = new ObjectId(borrower_Id);
      // Removing the borrower with the specified ID from the 'borrower' collection
    const response = await mongodb.getDb().db().collection('borrower').deleteOne({ _id: borrowerId });
        console.log(response);
        // Responding with status 204 if the borrower is successfully deleted
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            // Responding with status 404 if the borrower does not exist
            res.status(404).json({ error: 'borrower not found' });
        }
    } catch (error) {
      // Responding with status 500 and an error message if there's an issue
        console.error(error);
        res.status(500).json({ error: 'Some error occurred while deleting the borrower.' });
    }
};

module.exports = {
    getAll,
    getSingle,
    newBorrower,
    updateBorrower,
    deleteBorrrower
};