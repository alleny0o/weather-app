// routes/bookmarks.js
const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../utils/authMiddleware'); // Correctly import the function

// Add a city to bookmarks
router.post('/add', authenticateToken, async (req, res) => {
  const { city } = req.body;

  if (!city || typeof city !== 'string') {
    return res.status(400).json({ error: 'Valid city name is required.' });
  }

  try {
    // Check if the city is already bookmarked
    if (req.user.cities.includes(city)) {
      return res.status(400).json({ error: 'City is already bookmarked.' });
    }

    // Add the city to the user's bookmarks
    req.user.cities.push(city);
    await req.user.save();

    res.json({ message: 'City added to bookmarks.', cities: req.user.cities });
  } catch (err) {
    console.error('Error adding bookmark:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// Remove a city from bookmarks
router.post('/remove', authenticateToken, async (req, res) => {
  const { city } = req.body;

  if (!city || typeof city !== 'string') {
    return res.status(400).json({ error: 'Valid city name is required.' });
  }

  try {
    const index = req.user.cities.indexOf(city);
    if (index === -1) {
      return res.status(400).json({ error: 'City is not bookmarked.' });
    }

    // Remove the city from bookmarks
    req.user.cities.splice(index, 1);
    await req.user.save();

    res.json({ message: 'City removed from bookmarks.', cities: req.user.cities });
  } catch (err) {
    console.error('Error removing bookmark:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// Get all bookmarked cities
router.get('/', authenticateToken, async (req, res) => {
  try {
    res.json({ cities: req.user.cities || [] });
  } catch (err) {
    console.error('Error fetching bookmarks:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
