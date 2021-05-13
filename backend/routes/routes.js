const router = require('express').Router()

// Controllers
const ScoreController = require('../score/scoreController')
const QuestionController = require('../question/questionController')

// Score routes
router.post('/scores', ScoreController.createScore)
router.get('/scores', ScoreController.getTopScores)

// Question routes
router.post('/question', QuestionController.createQuestion)
router.get('/question', QuestionController.getAllQuestions)

module.exports = router
