const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_SECRET_KEY;
// const adm_login = process.env.ADMIN_LOGIN;
// const adm_password = process.env.ADMIN_PASSWORD;
const User = require('../models/user');
// je décommente ci dessous pour enregistrer un admin
// req.body.admin = true;
//create a new user
exports.register = function (req, res) {
  const saltRounds = 10;
  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) {
      console.error(err);
    } else {
      const { password } = req.body;
      bcrypt.hash(password, salt, function (err, hash) {
        if (err) {
          console.error(err);
        } else {
          const { name, pseudo, email } = req.body;
          // instance qui enregistre un user
          const user = new User({
            name,
            pseudo,
            email,
            password: hash,
            // admin: true,
          });
          //sauvegarde de l'user
          user.save((err, newUser) => {
            if (err) {
              console.log(err);
              res.status(400).json(err);
            } else {
              console.log(newUser);
              res.status(201).json(newUser);
            }
          });
        }
      });
    }
  });
};

// momentum:
// 200 : succès de la requête ;
// 201 : donnée envoyé
// 204 : pas de contenu - requête réussit pas besoin de quitter la page

// 301 et 302 : redirection, respectivement permanente et temporaire;
// 401 : utilisateur non authentifié ;
// 403 : accès refusé ;
// 404 : page non trouvée ;

// 500 et 503 : erreur serveur ;
// 504 : le serveur n'a pas répondu;

//connect a user - auth user et auth
//@accès public
exports.login = (req, res) => {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      res.status(400).json({
        auth: false,
        message: err,
      });
    }
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    } else {
      bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (result) {
          // génère un token
          const expireIn = 24 * 60 * 60;
          const payload = {
            user: {
              id: user._id,
              admin: user.admin,
            },
          };
          let token = jwt.sign(
            {
              payload,
              admin: user.admin,
            },
            jwt_secret,
            {
              expiresIn: expireIn,
            }
          );

          return res.status(200).json({
            success: true,
            token: token,
          });
        } else {
          return res
            .status(401)
            .json({ success: false, message: 'wrong_credentials' });
        }
      });
    }
  });
};

exports.getLogUser = asyncHandler(async (req, res) => {
  const id = req.user.id;
  const user = await User.findById(id).select('-password -notes');
  if (!user) {
    return next(new ErrorResponse(`Cannot get id ${id} maybe not found`), 404);
  }
  res.status(200).json({ success: true, user });
});

// exports.getLogUser = async (req, res) => {
//   const user = await User.findById(req.user.id)
//     .select('-password -notes')
//     .then((user) => {
//       res.json({ success: true, user });
//       console.log(user);
//     })
//     .catch((err) => {
//       console.error(err.message);
//       res.status(500).json({ message: 'Server error' });
//     });
// };

// exports.getLogUser = async (req, res) => {
//   try {
//     //   get user from db
//     const user = await User.findById(req.user.id).select('-password');
//     res.json(user);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// };

// ôtre manière de create un user
// let user = await User.findOne({ email });
// if (user) {
//   return res.status(400).json({ msg: 'user already exist' });
// }
// const salt = 10;
// const{name, pseudo,email,password}= req.body;
// user = new User({ name, email,pseudo, password });
// const salt = await bcrypt.genSalt(10);
// user.password = await bcrypt.hash(password, salt);
// await user.save();
