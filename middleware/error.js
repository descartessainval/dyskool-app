const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.maessage = err.message; //error.message a pour valeur err.message
  //log to console for dev
  // console.log(err.stack.red);
  console.log(err);

  // Mongoose has ObjectId => problème avec l'id
  if (err.name === 'CastError') {
    const message = `Ressource not found with id ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  //Mongoose duplicate key => si y a un doublon
  if (err.code === 11000) {
    const message = `Duplicate field value entered`;
    error = new ErrorResponse(message, 400);
  }

  //Mongoose validation error - Mongoose des input empty
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  if (err.statusCode === 401) {
    const message = `No token, authorisation denied`;
    error = new ErrorResponse(message, 401);
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || 'Server Error' });
};

module.exports = errorHandler;
