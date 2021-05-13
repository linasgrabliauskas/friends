const mongoose = require('mongoose')

let ScoreSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  prize: {
    type: Number,
    required: true
  },
  time: {
    type: Number,
    required: true
  },
  score: {
    type: Number,
    required: true
  }
})

let Score = mongoose.model('Score', ScoreSchema)
module.exports = Score
