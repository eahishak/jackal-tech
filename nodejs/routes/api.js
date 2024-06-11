const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/data', (req, res) => {
  res.json({ message: 'API Endpoint' });
});

router.get('/user', userController.getUser);

module.exports = router;
