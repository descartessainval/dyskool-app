const express = require('express');

const {
  createNote,
  getNotes,
  getNote,
  modifyNote,
  deleteNote,
} = require('../controllers/note');

const router = express.Router();

// middleware
const { protect } = require('../middleware/auth');
// validation => method destructuring
const { validateNote } = require('../validators/noteValidator');

router
  .route('/')
  .get(protect, getNotes)
  .post(protect, validateNote, createNote);
router
  .route('/:id')
  .get(protect, getNote)
  .put(protect, validateNote, modifyNote)
  .delete(protect, deleteNote);

module.exports = router;
