const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const jwtSecret = process.env.JWT_SECRET_KEY;
const User = require('../models/user');

exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  // check token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Get token from header
    token = req.headers.authorization.split(' ')[1];
  }
  //check if not token
  if (!token) {
    return next(new ErrorResponse(`No token, authorisation denied`, 401));
  }
  try {
    // methode verify (param1= le token, param2= la clé secret  )
    const decoded = jwt.verify(token, jwtSecret);
    // extract the user obj from the decoded object
    req.user = decoded.payload.user;
    // console.log(req.user);
    next();
  } catch (err) {
    return next(new ErrorResponse(`Token is not valid`, 401));
  }
});

// module.exports = function (req, res, next) {
//   // Get token from header
//   const token = req.header('x-auth-token');
//   //check if not token
//   if (!token) {
//     return res.status(401).json({ msg: 'No token, authorisation denied' });
//   }

//   //   si il a un token on a besoin de vérifier
//   try {
//     // methode verify (param1= le token, param2= la clé secret  )
//     const decoded = jwt.verify(token, jwtSecret);
//     req.user = decoded.user;
//     next();
//   } catch (error) {
//     res.status(401).json({ msg: 'Token is not valid' });
//   }
// };

//Grant acces to specific roles - Ici seul admin peut y acceder
exports.authorize = (admin) => {
  return (req, res, next) => {
    admin = req.user.admin;
    if (!admin === true) {
      return next(
        new ErrorResponse(
          `User status admin is ${req.user.admin}. UserID ${req.user.id} is not authorize to access this route`,
          403
        )
      );
    }
    next();
  };
};
