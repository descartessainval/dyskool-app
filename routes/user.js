const express = require('express');
const {
  getAllUsers,
  createUser,
  getById,
  modifyUser,
  deleteUser,
} = require('../controllers/user');

const router = express.Router();

// middleware
const { protect, authorize } = require('../middleware/auth');
// middleware for all route
// router.use(protect);
// router.use(authorize({ admin: true }));
// validation => method destructuring
const { validateUser } = require('../validators/userValidator');

router.route('/').get(getAllUsers).post(validateUser, createUser);
router.route('/:id').get(getById).put(modifyUser).delete(deleteUser);

module.exports = router;
