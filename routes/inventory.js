// inventory route file

const express = require('express');
const router = express.Router();


const inventoryController = require('../controllers/inventory')
const validation = require('../middleware/validate');
const OAuth = require("../middleware/authorize");

// Validation and Oauth added after testing of routes

router.get('/', inventoryController.getAll);

router.get('/:id', inventoryController.getSingle);

router.post('/', /*OAuth.checkLogStatus,*/ validation.saveInventory, inventoryController.newInventory);

router.put('/:id', /*OAuth.checkLogStatus,*/ validation.saveInventory, inventoryController.updateInventory);

router.delete('/:id', /*OAuth.checkLogStatus,*/ inventoryController.deleteInventory);

// export module for rest of code to use
module.exports = router;