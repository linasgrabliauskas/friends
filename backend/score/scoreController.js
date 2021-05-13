const Score = require('./scoreModel')

let getTopScores = async (req, res) => {
  // Top 100
  let scoresToShow = 100
  try {
    let topScores = await Score.find({}).sort({ score: -1 }).limit(scoresToShow)
    res.json(topScores)
  } catch (err) {
    res.status(400).json(err)
  }
}


let createScore = async (req, res) => {
  let score = new Score(req.body)
  try {
    let savedScore = await score.save()
    res.json(savedScore)
  } catch (err) {
    res.status(400).json(err)
  }
}


module.exports = {
  getTopScores,
  createScore
}