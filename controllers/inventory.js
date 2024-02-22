// inventory collection controller

// points variable to path of db connection information 
const mongodb = require('../db/connection');
// important ObjectId and allows single pull inventory to work and not error out and murder the server
const ObjectId = require('mongodb').ObjectId;

// pull all inventorys from db and creats an array using asynchronous fuction
const getAll = async (req, res, next) => {
    try {
        // Using MongoDB's async API to get the 'inventory' collection 
        const result = await mongodb.getDb().db().collection('inventory').find();
        
        // Converting the result to an array
        const lists = await result.toArray();

        // Setting the response header to indicate JSON content
        res.setHeader('Content-Type', 'application/json');
        
        // Sending a JSON response with the fetched inventory
        res.status(200).json(lists);
    } catch (error) {
        // Handle errors here
        console.error("Error fetching inventorys:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
const getSingle = async (req, res, next) => {
    // Extracting the inventory ID from the request parameters
    const inventoryId = new ObjectId(req.params.id);
    try {
        // Using MongoDB's async API to get the specified inventory by ID
        const result = await mongodb
            .getDb()
            .db()
            .collection('inventorys')
            .find({ _id: inventoryId });
    
        const lists = await result.toArray();
    
        if (lists.length > 0) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);
        } else {
            res.status(404).json({ error: 'inventory not found' });
        }
    } catch (error) {
        console.error('Error fetching single inventory:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// creates new inventory and sends to db
const newInventory = async (req, res) => {
    try {
        const inventory = {
            title: req.body.title,
            genre: req.body.genre,
            rating: req.body.rating,
            runTime: req.body.runTime,
            releaseYear: req.body.releaseYear,
            director: req.body.director,
            metascore: req.body.metascore
        };
        const response = await mongodb.getDb().db().collection('inventory').insertOne(inventory);
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the inventory.');
        }
    } catch (error) {
        // Handle errors here
        console.error("Error creating inventory:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// update existing db
const updateInventory = async (req, res) => {
    try {
      // Extracting inventory ID from the request parameters
    const inventory_Id = req.params.id;
      // Validate that inventory_id is a valid ObjectId before attempting to create ObjectId
    if (!ObjectId.isValid(inventory_Id)) {
        return res.status(400).json({ error: 'Invalid inventory ID format' });
    }
    const inventoryId = new ObjectId(inventory_Id);
      // Creating a inventory object from the request body
    const inventory = {
        title: req.body.title,
        genre: req.body.genre,
        rating: req.body.rating,
        runTime: req.body.runTime,
        releaseYear: req.body.releaseYear,
        director: req.body.director,
        metascore: req.body.metascore
    };
      // Updating the inventory with the specified ID in the 'inventory' collection
    const response = await mongodb.getDb().db().collection('inventory').replaceOne({ _id: inventoryId }, inventory);
    console.log('Update Response:', response);
      // Responding with status 204 if the inventory is successfully updated
    if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
        // Responding with status 404 if the inventory does not exist
            res.status(404).json({ error: 'inventory not found' });
        }
    } catch (error) {
      // Log the error for troubleshooting
        console.error('Error in updateinventorys:', error);
      // Responding with status 500 and an error message if there's an issue
        res.status(500).json({ error: 'Some error occurred while updating the inventory.' });
    }
};
// delete existing inventory
const deleteInventory = async (req, res) => {
    try {
      // Extracting inventory ID from the request parameters
    const inventory_Id = req.params.id;
      // Validate that inventoryId is a valid ObjectId before attempting to create ObjectId
    if (!ObjectId.isValid(inventory_Id)) {
        return res.status(400).json({ error: 'Invalid inventory ID format' });
    }
    const inventoryId = new ObjectId(inventory_Id);
      // Removing the inventory with the specified ID from the 'inventory' collection
    const response = await mongodb.getDb().db().collection('inventory').deleteOne({ _id: inventoryId });
        console.log(response);
        // Responding with status 204 if the inventory is successfully deleted
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            // Responding with status 404 if the inventory does not exist
            res.status(404).json({ error: 'inventory not found' });
        }
    } catch (error) {
      // Responding with status 500 and an error message if there's an issue
        console.error(error);
        res.status(500).json({ error: 'Some error occurred while deleting the inventory.' });
    }
};

module.exports = {
    getAll,
    getSingle,
    newInventory,
    updateInventory,
    deleteInventory,
};