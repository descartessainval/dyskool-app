const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Note = require('../models/Note');

//@desc     Get all users
//@route    GET /api/v2/users
//@accses   Private
exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find().populate({
    path: 'notes',
    model: 'Note',
    select: {
      _id: 1,
      note: 1,
      date: 1,
    },
  });
  if (!users) {
    return next(
      new ErrorResponse(`Cannot get users. Maybe users were not found`, 404)
    );
  }
  res.status(200).json({ success: true, count: users.length, users: users });
});

//@desc     Create a users
//@route    POST /api/v2/users
//@accses   Private to admin
exports.createUser = asyncHandler(async (req, res, next) => {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);
  const { name, pseudo, email } = req.body;
  const user = await User.create({ name, pseudo, email, password });
  res.status(201).json({
    success: true,
    user: user,
  });
});

//@desc     Get single user by id
//@route    GET /api/v2/users/:id
//@accses   Private
exports.getById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id).populate({
    path: 'notes',
    model: 'Note',
    select: {
      _id: 1,
      note: 1,
      date: 1,
    },
  });
  if (!user) {
    return next(
      new ErrorResponse(
        `Cannot get user id ${id}. Maybe  user is not found`,
        404
      )
    );
  }
  res.status(200).json({ success: true, user: user });
});

// update a user
exports.modifyUser = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  let user = await User.findById(id);
  if (!user) {
    return next(
      new ErrorResponse(
        `cannot user with  id-${id}, maybe user is not found `,
        404
      )
    );
  }

  user = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  }).select('-notes -password');

  res.status(200).json({
    success: true,
    msg: `Update user ${id}`,
    user: user,
  });
  // const id = req.params.id;
  // User.updateOne(
  //   { _id: id },
  //   { $set: { ...req.body } },
  //   { upsert: true },
  //   function (err) {
  //     if (err) {
  //       res.status(400).json({ error: err });
  //     } else {
  //       res.status(200).json({ message: 'user modifed!' });
  //     }
  //   }
  // );
});

//delete a user
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) {
    return next(
      new ErrorResponse(
        `Cannot delete user with  id-${id}. Maybe user was not found`,
        401
      )
    );
  }
  await user.remove();
  res.status(200).json({ success: true, data: {} });
  // const id = req.params.id;
  // User.deleteOne({ _id: id }, function (err, user) {
  //   if (err) {
  //     res.status(400).json(err);
  //   } else {
  //     res.status(200).json({ message: 'user effacé' });
  //   }
  // });
});
