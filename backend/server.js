const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Traffic = require('./models/Traffic');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// API Routes

// 1. Get all traffic records (paginated/limited)
app.get('/api/traffic', async (req, res) => {
    try {
        const data = await Traffic.find().sort({ timestamp: -1 }).limit(50);
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. Get Traffic Statistics (Aggregated by Area)
app.get('/api/traffic/stats', async (req, res) => {
    try {
        const stats = await Traffic.aggregate([
            {
                $group: {
                    _id: "$area",
                    vehicleCount: { $sum: 1 },
                    avgSpeed: { $avg: "$speed" }
                }
            }
        ]);
        res.json(stats);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 3. Get Congestion Alerts
app.get('/api/traffic/alerts', async (req, res) => {
    try {
        const alerts = await Traffic.find({ is_congestion: true }).sort({ timestamp: -1 }).limit(10);
        res.json(alerts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 4. Simple Search/Filter
app.get('/api/traffic/search', async (req, res) => {
    const { area, vehicle_type } = req.query;
    let query = {};
    if (area) query.area = area;
    if (vehicle_type) query.vehicle_type = vehicle_type;

    try {
        const results = await Traffic.find(query).sort({ timestamp: -1 }).limit(100);
        res.json(results);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
