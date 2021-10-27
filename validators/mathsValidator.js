const { check, validationResult } = require('express-validator');

exports.validateMaths = [
  check('matter')
    .not()
    .isEmpty()
    .withMessage('Maths matter  can not be empty!'),
  check('name').not().isEmpty().withMessage('Maths name can not be empty!'),
  check('rule').not().isEmpty().withMessage('Maths rule can not be empty!'),
  check('validAnswers')
    .not()
    .isEmpty()
    .withMessage('Maths validAnswers can not be empty!'),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
