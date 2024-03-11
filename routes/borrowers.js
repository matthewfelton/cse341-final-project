// borrowers route file
const express = require('express');
const router = express.Router();


const borrowerController = require('../controllers/borrowers')
const validation = require('../middleware/validate');
//const OAuth = require("../middleware/authorize");

// Validation and Oauth added after testing of routes

router.get('/', borrowerController.getAll);

router.get('/:id', borrowerController.getSingle);

router.post('/', validation.saveBorrowers, borrowerController.newBorrower);

router.put('/:id', validation.saveBorrowers, borrowerController.updateBorrower);

router.delete('/:id',borrowerController.deleteBorrrower);

// export module for rest of code to use
module.exports = router;