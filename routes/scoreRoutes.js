const express = require('express');
const router = express.Router();
const Match = require('../models/Match');

// Get current match data
router.get('/', async (req, res) => {
    const match = await Match.findOne();
    if (!match) {
        return res.status(404).json({ message: 'No match found' });
    }
    res.json(match);
});

// Update the score for a specific ball
router.post('/update', async (req, res) => {
    const { runs, ballNumber, overNumber } = req.body;

    let match = await Match.findOne();
    if (!match) {
        match = new Match(); // Create a new match if none exists
    }

    // Update the score for the current ball
    if (match.overs[overNumber] === undefined) {
        match.overs[overNumber] = { overNumber, balls: [] };
    }
    match.overs[overNumber].balls[ballNumber - 1] = runs;

    // Update match score
    match.runs += runs;
    if (runs === 'Out') match.wickets += 1;

    match.currentBall += 1;

    if (match.currentBall > 6) {
        match.currentBall = 1;
        match.currentOver += 1;
    }

    await match.save();
    res.json(match);
});

module.exports = router;
