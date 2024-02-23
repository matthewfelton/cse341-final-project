// event collection controller

// points variable to path of db connection information 
const mongodb = require('../db/connection');
// important ObjectId and allows single pull event to work and not error out and murder the server
const ObjectId = require('mongodb').ObjectId;

// pull all event from db and creats an array using asynchronous fuction
const getAll = async (req, res, next) => {
    try {
        // Using MongoDB's async API to get the 'event' collection 
        const result = await mongodb.getDb().db().collection('event').find();
        
        // Converting the result to an array
        const lists = await result.toArray();

        // Setting the response header to indicate JSON content
        res.setHeader('Content-Type', 'application/json');
        
        // Sending a JSON response with the fetched event
        res.status(200).json(lists);
    } catch (error) {
        // Handle errors here
        console.error("Error fetching events:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
const getSingle = async (req, res, next) => {
    // Extracting the event ID from the request parameters
    const eventId = new ObjectId(req.params.id);
    try {
        // Using MongoDB's async API to get the specified event by ID
        const result = await mongodb
            .getDb()
            .db()
            .collection('event')
            .find({ _id: eventId });
    
        const lists = await result.toArray();
    
        if (lists.length > 0) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);
        } else {
            res.status(404).json({ error: 'event not found' });
        }
    } catch (error) {
        console.error('Error fetching single event:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// creates new event and sends to db
const newEvent = async (req, res) => {
    try {
        const event = {
            eventName: req.body.eventName,
            eventType: req.body.eventType,
            creator: req.body.creator,
            date: req.body.date,
            ticketed: req.body.ticketed,
            cost: req.body.cost
        };
        const response = await mongodb.getDb().db().collection('event').insertOne(event);
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the event.');
        }
    } catch (error) {
        // Handle errors here
        console.error("Error creating event:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// update existing db
const updateEvent = async (req, res) => {
    try {
      // Extracting event ID from the request parameters
    const event_Id = req.params.id;
      // Validate that event_id is a valid ObjectId before attempting to create ObjectId
    if (!ObjectId.isValid(event_Id)) {
        return res.status(400).json({ error: 'Invalid event ID format' });
    }
    const eventId = new ObjectId(event_Id);
      // Creating a event object from the request body
    const event = {
        eventName: req.body.eventName,
        eventType: req.body.eventType,
        creator: req.body.creator,
        date: req.body.date,
        ticketed: req.body.ticketed,
        cost: req.body.cost
    };
      // Updating the event with the specified ID in the 'event' collection
    const response = await mongodb.getDb().db().collection('event').replaceOne({ _id: eventId }, event);
    console.log('Update Response:', response);
      // Responding with status 204 if the event is successfully updated
    if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
        // Responding with status 404 if the event does not exist
            res.status(404).json({ error: 'event not found' });
        }
    } catch (error) {
      // Log the error for troubleshooting
        console.error('Error in updateevents:', error);
      // Responding with status 500 and an error message if there's an issue
        res.status(500).json({ error: 'Some error occurred while updating the event.' });
    }
};
// delete existing event
const deleteEvent = async (req, res) => {
    try {
      // Extracting event ID from the request parameters
    const event_Id = req.params.id;
      // Validate that eventId is a valid ObjectId before attempting to create ObjectId
    if (!ObjectId.isValid(event_Id)) {
        return res.status(400).json({ error: 'Invalid event ID format' });
    }
    const eventId = new ObjectId(event_Id);
      // Removing the event with the specified ID from the 'event' collection
    const response = await mongodb.getDb().db().collection('event').deleteOne({ _id: eventId });
        console.log(response);
        // Responding with status 204 if the event is successfully deleted
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            // Responding with status 404 if the event does not exist
            res.status(404).json({ error: 'event not found' });
        }
    } catch (error) {
      // Responding with status 500 and an error message if there's an issue
        console.error(error);
        res.status(500).json({ error: 'Some error occurred while deleting the event.' });
    }
};

module.exports = {
    getAll,
    getSingle,
    newEvent,
    updateEvent,
    deleteEvent
};