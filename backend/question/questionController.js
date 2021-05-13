const Question = require('./questionModel')

let getAllQuestions = async (req, res) => {
  try {
    let allQuestions = await Question.find({})
    res.json(allQuestions)
  } catch (err) {
    res.status(400).json(err)
  }
}

let createQuestion = async (req, res) => {
  let question = new Question(req.body)
  try {
    let savedQuestion = await question.save()
    res.json(savedQuestion)
  } catch (err) {
    res.status(400).json(err)
  }
}

module.exports = {
  getAllQuestions,
  createQuestion
}