// content creators collection controller

// content creators collection controller

// points variable to path of db connection information 
const mongodb = require('../db/connection');
// important ObjectId and allows single pull content creator to work and not error out and murder the server
const ObjectId = require('mongodb').ObjectId;

// pull all content creator from db and creats an array using asynchronous fuction
const getAll = async (req, res, next) => {
    try {
        // Using MongoDB's async API to get the 'content creator' collection 
        const result = await mongodb.getDb().db().collection('content_creator').find();
        
        // Converting the result to an array
        const lists = await result.toArray();

        // Setting the response header to indicate JSON content
        res.setHeader('Content-Type', 'application/json');
        
        // Sending a JSON response with the fetched content creator
        res.status(200).json(lists);
    } catch (error) {
        // Handle errors here
        console.error("Error fetching content creators:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
const getSingle = async (req, res, next) => {
    // Extracting the content creator ID from the request parameters
    const creatorId = new ObjectId(req.params.id);
    try {
        // Using MongoDB's async API to get the specified content creator by ID
        const result = await mongodb
            .getDb()
            .db()
            .collection('content_creators')
            .find({ _id: creatorId });
    
        const lists = await result.toArray();
    
        if (lists.length > 0) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);
        } else {
            res.status(404).json({ error: 'content creator not found' });
        }
    } catch (error) {
        console.error('Error fetching single content creator:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// creates new content creator and sends to db
const newContentCreators = async (req, res) => {
    try {
        const creator = {
            title: req.body.title,
            genre: req.body.genre,
            rating: req.body.rating,
            runTime: req.body.runTime,
            releaseYear: req.body.releaseYear,
            director: req.body.director,
            metascore: req.body.metascore
        };
        const response = await mongodb.getDb().db().collection('content_creators').insertOne(creator);
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the content creator.');
        }
    } catch (error) {
        // Handle errors here
        console.error("Error creating content creator:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// update existing db
const updateContentCreators = async (req, res) => {
    try {
      // Extracting content creator ID from the request parameters
    const creator_Id = req.params.id;
      // Validate that content creator is a valid ObjectId before attempting to create ObjectId
    if (!ObjectId.isValid(creator_Id)) {
        return res.status(400).json({ error: 'Invalid create ID format' });
    }
    const creatorId = new ObjectId(creator_Id);
      // Creating a content creator object from the request body
    const creator = {
        title: req.body.title,
        genre: req.body.genre,
        rating: req.body.rating,
        runTime: req.body.runTime,
        releaseYear: req.body.releaseYear,
        director: req.body.director,
        metascore: req.body.metascore
    };
      // Updating the content creator with the specified ID in the 'content creator' collection
    const response = await mongodb.getDb().db().collection('content_creators').replaceOne({ _id: creatorId }, creator);
    console.log('Update Response:', response);
      // Responding with status 204 if the content creator is successfully updated
    if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
        // Responding with status 404 if the content creator does not exist
            res.status(404).json({ error: 'creator not found' });
        }
    } catch (error) {
      // Log the error for troubleshooting
        console.error('Error in updateCreatorContent:', error);
      // Responding with status 500 and an error message if there's an issue
        res.status(500).json({ error: 'Some error occurred while updating the content creator.' });
    }
};
// delete existing content creator
const deleteContentCreators = async (req, res) => {
    try {
      // Extracting content creator ID from the request parameters
    const creator_Id = req.params.id;
      // Validate that creatorId is a valid ObjectId before attempting to create ObjectId
    if (!ObjectId.isValid(creator_Id)) {
        return res.status(400).json({ error: 'Invalid content creator ID format' });
    }
    const creatorId = new ObjectId(creator_Id);
      // Removing the content creator with the specified ID from the 'content creator' collection
    const response = await mongodb.getDb().db().collection('content_creators').deleteOne({ _id: creatorId });
        console.log(response);
        // Responding with status 204 if the content creator is successfully deleted
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            // Responding with status 404 if the content creator does not exist
            res.status(404).json({ error: 'content creator not found' });
        }
    } catch (error) {
      // Responding with status 500 and an error message if there's an issue
        console.error(error);
        res.status(500).json({ error: 'Some error occurred while deleting the content creator.' });
    }
};

module.exports = {
    getAll,
    getSingle,
    newContentCreators,
    updateContentCreators,
    deleteContentCreators
};