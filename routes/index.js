// Web index file for routes

const express = require('express');
const router = express.Router();

// swagger route commented till using to prevent errors
// router.use('/api-doc', require('./swagger'));


// collection routes 



router.get('*', (req, res) => {
    res.send('404: Page not found, sorry!')
})

module.exports = router;