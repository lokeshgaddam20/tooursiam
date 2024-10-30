// models/Itinerary.js
const mongoose = require('mongoose');

const ItinerarySchema = new mongoose.Schema({
  title: { type: String, required: true },
  destination: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  accommodation: [String],
  transportation: [String],
  days: [{
    title: String,
    activities: [String]
  }],
  tips: [String]
}, { timestamps: true });

module.exports = mongoose.model('Itinerary', ItinerarySchema);