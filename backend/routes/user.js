const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Example route
router.get('/', (req, res) => {
    res.send('User API');
});

module.exports = router;
