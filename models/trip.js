const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    destination: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    activities: {
        type: [String],
        default: []
    },
    notes: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Trip', tripSchema);