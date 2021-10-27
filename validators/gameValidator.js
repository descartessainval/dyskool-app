const { check, validationResult } = require('express-validator');

exports.validateGame = [
  // name
  // picture
  // media
  // rule
  check('name').not().isEmpty().withMessage('Game name can not be empty!'),
  check('rule').not().isEmpty().withMessage('Game rule  can not be empty!'),
  check('media').not().isEmpty().withMessage('Game media can not be empty!'),
  async (req, res, next) => {
    // console.log('async accessible!');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
