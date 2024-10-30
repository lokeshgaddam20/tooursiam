// routes/itinerary.js
const express = require('express');
const Itinerary = require('../models/Itinerary');
const router = express.Router();

router.post('/save', async (req, res) => {
  try {
    const { title, destination, startDate, endDate, accommodation, transportation, days, tips } = req.body;

    if (!title || !destination || !startDate || !endDate) {
      return res.status(400).json({ message: 'Title, destination, start date, and end date are required' });
    }

    const newItinerary = new Itinerary({
      title,
      destination,
      startDate,
      endDate,
      accommodation,
      transportation,
      days,
      tips
    });
    
    const savedItinerary = await newItinerary.save();
    res.status(201).json({ message: 'Itinerary saved successfully!', itinerary: savedItinerary });
  } catch (error) {
    console.error('Error saving itinerary:', error);
    res.status(500).json({ message: 'Failed to save itinerary' });
  }
});

router.get('/', async (req, res) => {
  try {
    const itineraries = await Itinerary.find();
    res.status(200).json(itineraries);
  } catch (error) {
    console.error('Error fetching itineraries:', error);
    res.status(500).json({ message: 'Failed to fetch itineraries' });
  }
});

module.exports = router;