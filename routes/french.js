const express = require('express');
const {
  createFrench,
  getFrenchs,
  getFrench,
  modifyFrench,
  deleteFrench,
} = require('../controllers/french');

const router = express.Router();

// middleware
const { protect, authorize } = require('../middleware/auth');

// validation => method destructuring
const { validateFrench } = require('../validators/frenchValidator');

router
  .route('/')
  .get(
    // protect,
    getFrenchs
  )
  .post(protect, authorize({ admin: true }), validateFrench, createFrench);
router
  .route('/:id')
  .get(protect, getFrench)
  .put(protect, authorize({ admin: true }), modifyFrench)
  .delete(protect, authorize({ admin: true }), deleteFrench);

module.exports = router;
