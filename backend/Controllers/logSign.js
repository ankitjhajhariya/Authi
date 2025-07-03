const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../Models/user');

const SECRET = process.env.JWT_SECRET;

// ✅ SIGNUP
const signUp = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: 'Email already in use' });

        const hashed = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashed });
        await user.save();

        res.json({ message: 'SignUp Successfully', success: true });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// ✅ LOGIN
const logIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '1h' });
        res.json({ token, message: 'Login successful!' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = {
    signUp,
    logIn,
};
