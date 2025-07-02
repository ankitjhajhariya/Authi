const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({ path: './backend/.env' });

const authRoutes = require('./routes/Auth');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_CONNECT;

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ DB Connection
mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Routes
app.use('/api', authRoutes);

// ✅ Server start
app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`)
);
