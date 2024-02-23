// Web index file for routes

const express = require('express');
const router = express.Router();

// swagger route commented till using to prevent errors
// router.use('/api-doc', require('./swagger'));


// collection routes 
router.use('/borrowers', require('./borrowers'));
router.use('/content_creators', require('./content_creators'));
router.use('/event', require('./event'));
router.use('/inventory', require('./inventory'));

router.get('*', (req, res) => {
    res.send('404: Page not found, sorry!')
})

module.exports = router;