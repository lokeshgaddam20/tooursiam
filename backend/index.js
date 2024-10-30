const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const express = require('express');
const app = express();
const authRoute = require("./routes/auth.route");
const itineraryRoutes = require('./routes/itinerary'); // Import itinerary routes

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' }));

// Routes
app.use('/api/itineraries', itineraryRoutes);
app.use('/api/auth', authRoute);

mongoose.connect(process.env.MONGODBURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Basic route to check if the server is running
app.get('/', (req, res) => {
  res.json('Server is ready');
});

// Error handling middleware (optional but helpful)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Set the PORT, with a fallback to 7800 if not set in .env
const PORT = process.env.PORT || 7800;
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
