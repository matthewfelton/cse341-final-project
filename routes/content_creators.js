// content creators route file
const express = require('express');
const router = express.Router();


const contentCreatorsController = require('../controllers/content_creators')
const validation = require('../middleware/validate');
//const OAuth = require("../middleware/authorize");

// Validation and Oauth added after testing of routes

router.get('/', contentCreatorsController.getAll);

router.get('/:id', contentCreatorsController.getSingle);

router.post('/', validation.saveContentCreators, contentCreatorsController.newContentCreators);

router.put('/:id', validation.saveContentCreators, contentCreatorsController.updateContentCreators);

router.delete('/:id',contentCreatorsController.deleteContentCreators);

// export module for rest of code to use
module.exports = router;