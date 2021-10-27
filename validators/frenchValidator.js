const { check, validationResult } = require('express-validator');

exports.validateFrench = [
  check('matter')
    .not()
    .isEmpty()
    .withMessage('French matter  can not be empty!'),
  check('name').not().isEmpty().withMessage('French name can not be empty!'),
  check('rule').not().isEmpty().withMessage('French rule can not be empty!'),
  check('validAnswers')
    .not()
    .isEmpty()
    .withMessage('Frenchs validAnswers can not be empty!'),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
