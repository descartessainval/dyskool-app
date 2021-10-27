const express = require('express');
const { register, login, getLogUser } = require('../controllers/auth');

const router = express.Router();
// validation => method destructuring
const { validateUser } = require('../validators/userValidator');

// middleware
const { protect } = require('../middleware/auth');

//router
router.route('/register').post(validateUser, register);

router.route('/login').post(login);
router.route('/logger').get(protect, getLogUser);

module.exports = router;
