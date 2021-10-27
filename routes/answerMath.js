const express = require('express');

const {
  createAnswer,
  getAnswers,
  getAnswer,
  modifyAnswer,
  deleteAnswer,
} = require('../controllers/AnswerMath');

const router = express.Router();

// middleware
const { protect } = require('../middleware/auth');
// validation => method destructuring
const { validateAnswer } = require('../validators/answerMath');

router
  .route('/')
  .get(protect, getAnswers)
  .post(protect, validateAnswer, createAnswer);
router
  .route('/:id')
  .get(protect, getAnswer)
  .put(protect, validateAnswer, modifyAnswer)
  .delete(protect, deleteAnswer);

module.exports = router;
