const express = require('express');
const signupController = require('../controllers/userController');

const router = express.Router();

router.post('/register', signupController.createUser);

module.exports = router;