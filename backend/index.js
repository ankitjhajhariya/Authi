const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config({ path: './backend/.env' });

const authRoutes = require('./routes/Auth.router');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_CONNECT;

const corsOptions = {
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// API Routes
app.use('/api', authRoutes);

// Root endpoint
app.get('/', (req, res) => {
    res.send('Backend is running');
});

// Start server
app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`)
);
