// event route file
const express = require('express');
const router = express.Router();


const eventController = require('../controllers/event')
const validation = require('../middleware/validate');
//const OAuth = require("../middleware/authorize");

// Validation and Oauth added after testing of routes

router.get('/', eventController.getAll);

router.get('/:id', eventController.getSingle);

router.post('/', validation.saveEvent, eventController.newEvent);

router.put('/:id', validation.saveEvent, eventController.updateEvent);

router.delete('/:id',eventController.deleteEvent);

// export module for rest of code to use
module.exports = router;