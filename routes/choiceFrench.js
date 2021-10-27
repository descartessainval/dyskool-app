const express = require('express');

const {
  createChoice,
  getChoices,
  getChoice,
  modifyChoice,
  deleteChoice,
} = require('../controllers/ChoiceFrench');

const router = express.Router();

// middleware
const { protect } = require('../middleware/auth');
// validation => method destructuring
const { validateChoice } = require('../validators/choiceValidator');

router
  .route('/')
  .get(protect, getChoices)
  .post(protect, validateChoice, createChoice);
router
  .route('/:id')
  .get(protect, getChoice)
  .put(protect, validateChoice, modifyChoice)
  .delete(protect, deleteChoice);

module.exports = router;
