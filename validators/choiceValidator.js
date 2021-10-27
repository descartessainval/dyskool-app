const { check, validationResult } = require('express-validator');

exports.validateChoice = [
  check('choice', 'choice name can not be empty!').not().isEmpty(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }
    next();
  },
];
