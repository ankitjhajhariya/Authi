// backend/routes/Auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const authMiddleware = require('../middleware/Auth');

const router = express.Router();
const SECRET = process.env.JWT_SECRET || 'YourSecretKeyHere';

// ✅ SIGNUP
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already in use' });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed });
    await user.save();

    res.json({ message: 'Signup successful!' });
});

// ✅ LOGIN
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
        return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '1h' });
    res.json({ token, message: 'Login successful!' });
});

// ✅ PROTECTED ROUTE
router.get('/protected', authMiddleware, (req, res) => {
    res.json({ msg: `Hello User ${req.user.id}, you are authenticated!` });
});

module.exports = router;
