const { check, validationResult } = require('express-validator');

exports.validateDefinition = [
  check('title')
    .not()
    .isEmpty()
    .withMessage('definition title  can not be empty!'),
  check('content')
    .not()
    .isEmpty()
    .withMessage('definition content can not be empty!'),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
