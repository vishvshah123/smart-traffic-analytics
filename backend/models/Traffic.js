const mongoose = require('mongoose');

const TrafficSchema = new mongoose.Schema({
    vehicle_id: { type: String, required: true },
    area: { type: String, required: true },
    vehicle_type: { type: String, required: true },
    speed: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
    is_congestion: { type: Boolean, default: false }
});

module.exports = mongoose.model('Traffic', TrafficSchema);
