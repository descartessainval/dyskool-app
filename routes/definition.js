const express = require('express');
const {
  createDefinition,
  getDefinitions,
  getDefinition,
  updateDefinition,
  deleteDefinition,
} = require('../controllers/definition');

const router = express.Router();

// middleware
const { protect, authorize } = require('../middleware/auth');

// validation => method destructuring
const { validateDefinition } = require('../validators/definitionValidator');
// no structuring
// const definitionValidator = require('../validators/definitionValidator');
//ce qui m'obligeait => definitionvalidator.validateDefinition => trop lourd

router.route('/').get(getDefinitions).post(
  //en attendant que le front fonctionne
  // protect,
  // authorize({ admin: true }),
  validateDefinition,
  createDefinition
);
router
  .route('/:id')
  .get(getDefinition)
  .put(
    // protect, authorize({ admin: true }),
    updateDefinition
  )
  .delete(
    // protect, authorize({ admin: true }),
    deleteDefinition
  );

module.exports = router;
