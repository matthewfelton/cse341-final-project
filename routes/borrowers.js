// borrowers route file
const express = require('express');
const router = express.Router();


const borrowerController = require('../controllers/borrowers')
const validation = require('../middleware/validate');
const OAuth = require("../middleware/authorize");

// Validation and Oauth added after testing of routes

router.get('/', /*OAuth.checkLogAll,*/ borrowerController.getAll);

router.get('/:id', /*OAuth.checkLogAll,*/ borrowerController.getSingle);

router.post('/', /*OAuth.checkLogAll,*/ validation.saveBorrowers, borrowerController.newBorrower);

router.put('/:id', /*OAuth.checkLogAll,*/ validation.saveBorrowers, borrowerController.updateBorrower);

router.delete('/:id', /*OAuth.checkLogAll,*/ borrowerController.deleteBorrrower);

// export module for rest of code to use
module.exports = router;