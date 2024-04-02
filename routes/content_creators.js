// content creators route file
const express = require('express');
const router = express.Router();


const contentCreatorsController = require('../controllers/content_creators')
const validation = require('../middleware/validate');
const OAuth = require("../middleware/authorize");

// Validation and Oauth added after testing of routes

router.get('/', OAuth.checkLogAll, contentCreatorsController.getAll);

router.get('/:id', OAuth.checkLogAll, contentCreatorsController.getSingle);

router.post('/', OAuth.checkLogAll, validation.saveContentCreators, contentCreatorsController.newContentCreators);

router.put('/:id', OAuth.checkLogAll, validation.saveContentCreators, contentCreatorsController.updateContentCreators);

router.delete('/:id', OAuth.checkLogAll, contentCreatorsController.deleteContentCreators);

// export module for rest of code to use
module.exports = router;