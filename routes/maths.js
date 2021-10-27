const express = require('express');
const {
  createMaths,
  getMaths,
  getMath,
  modifyMaths,
  deleteMaths,
} = require('../controllers/maths');

const router = express.Router();

// middleware
const { protect, authorize } = require('../middleware/auth');

// validation => method destructuring
const { validateMaths } = require('../validators/mathsValidator');

router
  .route('/')
  .get(getMaths)
  .post(protect, authorize({ admin: true }), validateMaths, createMaths);
router
  .route('/:id')
  .get(getMath)
  .put(protect, authorize({ admin: true }), modifyMaths)
  .delete(protect, authorize({ admin: true }), deleteMaths);

module.exports = router;
