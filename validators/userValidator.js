const { check, validationResult } = require('express-validator');
const adm_login = process.env.ADMIN_LOGIN;
const adm_password = process.env.ADMIN_PASSWORD;
const auth = require('../middleware/auth');

exports.validateUser = [
  check('name')
    .not()
    .isEmpty()
    .withMessage('User name can not be empty!')
    .isLength({ min: 3, max: 20 })
    .withMessage('Minimum 3 characters required!'),
  check('pseudo')
    .not()
    .isEmpty()
    .withMessage('User pseudo  can not be empty!')
    .isLength({ min: 3, max: 15 })
    .withMessage('Minimum 3 characters and 20 characters max required!'),
  check('email')
    .not()
    .isEmpty()
    .withMessage('User email  can not be empty!')
    .isEmail()
    .withMessage("It's not mail"),
  check(
    'password',
    'Saisie un mot de passe entre 3 et 20 caractères, au moins 8 caractères et contient au moins une majuscule, au moins une minuscule et au moins un nombre.'
    // 'Please enter a password between 8 and 20 characters at least 8 character and contain At least one uppercase.At least one lower case.At least one special character.  '
  )
    .not()
    .isEmpty()
    .isLength({ min: 3, max: 20 })
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/),
  async (req, res, next) => {
    // console.log('async accessible!');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
];

exports.validateLoginUser = [
  check('email', 'email user can not be empty').isEmail(),
  check('password', 'password user can not be empty').exists(),
  async (req, res, next) => {
    // console.log('async accessible!');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.validateLoginAdm = [
  check('email', 'email user can not be empty')
    .not()
    .isEmpty()
    .exists(`${adm_login}`),
  check('password', 'password user can not be empty')
    .not()
    .isEmpty()
    .exists(`${adm_password}`),
  async (req, res, next) => {
    // console.log('async accessible!');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
//petit rappel
// /^
//   (?=.*\d)          // should contain at least one digit //doit contenir au moins un chiffre
//   (?=.*[a-z])       // should contain at least one lower case //doit contenir au moins une minucule
//   (?=.*[A-Z])       // should contain at least one upper case //doit contenir au monis une majuscule
//   [a-zA-Z0-9]{8,}   // should contain at least 8 from the mentioned characters //doit contenir au moins 8 des caractères mentionnés
// $/
