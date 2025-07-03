const express = require('express');
const authMiddleware = require('../middleware/Auth');
const protectedController = require('../Controllers/protected/protected.api');
const logSign = require('../Controllers/logSign');

const router = express.Router();

// SIGNUP
router.post('/signup', logSign.signUp);

// LOGIN
router.post('/login', logSign.logIn);

// Protected route
router.get('/protected', authMiddleware, protectedController.protected);

module.exports = router;
