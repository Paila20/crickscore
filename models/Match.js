const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    runs: { type: Number, default: 0 },
    wickets: { type: Number, default: 0 },
    currentOver: { type: Number, default: 0 },
    currentBall: { type: Number, default: 1 },
    overs: [{
        overNumber: Number,
        balls: [Number], // Store runs per ball
    }],
});

const Match = mongoose.model('Match', matchSchema);
module.exports = Match;
