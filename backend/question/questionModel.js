const mongoose = require('mongoose')

let QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  answerA: {
    type: String,
    required: true
  },
  answerB: {
    type: String,
    required: true
  },
  answerC: {
    type: String,
    required: true
  },
  answerD: {
    type: String,
    required: true
  },
  correctAnswer: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true
  },
  isUsed: Boolean
})

let Question = mongoose.model('Question', QuestionSchema)
module.exports = Question
