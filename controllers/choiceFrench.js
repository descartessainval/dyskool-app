const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET_KEY;
const ChoiceFrench = require('../models/ChoiceFrench');
const French = require('../models/French');

//create choice

//Route                 POST /api/v2/choice
//@desc(description)    Add a new choice
//@access               Private for user => admin
exports.createChoice = async (req, res, next) => {
  if (!req.french.id) {
    res
      .status(400)
      .json({ message: 'paramters missing or french exercice not found' });
  } else {
    const choice = new ChoiceFrench({
      frenchId: req.french.id,
      answer: req.body.answer,
    });
    choice.save({ _id: req.params.id }).then((newChoice) => {
      console.log(newChoice);
      // ATTENTION
      // Ici je rajoute l'id dans le document note du model User
      French.updateOne(
        { _id: choice.frenchId },
        { $push: { choices: newChoice } }
      )
        .then((data) => {
          console.log(data);
          res.status(200).json({ data: choice });
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json(err);
        });
    });
  }
};

// retrieve all notes
//route                 GET /api/v2/notes
//@desc(description)    Get All Notes
//@access               Private user => admin ?
exports.getChoices = async (req, res, next) => {
  ChoiceFrench.find({ frenchId: req.french.id })
    .sort({
      date: -1,
    })
    .then((choices) =>
      res.status(201).json({ count: choices.length, choices: choices })
    )
    .catch((err) => res.status(400).json({ error: err }));
};

// retrieve  answer by ID
//route                 GET /api/v2/answers/:id
//@desc(description)    Get single answer
//@access               Private
exports.getChoice = async (req, res, next) => {
  ChoiceFrench.findOne({ _id: req.params.id }, function (err, choice) {
    if (err) {
      res.status(400).json({ err });
    } else {
      res.status(201).json({ choice });
    }
  });
};

// update a note by id
//Route                 POST /api/v2/notes
//@desc(description)    Update a single note
//@access               Private
exports.modifyChoice = asyncHandler(async (req, res, next) => {
  const { choice } = req.body;
  // builds note object
  const choiceFields = {};
  if (choice) choiceFields.choice = choice;
  const id = req.params.id;
  let content = await ChoiceFrench.findById(id);
  if (!content) {
    return next(
      new ErrorResponse(
        `cannot update choice  with  id-${id}, maybe choice is not found `,
        404
      )
    );
  }
  // make sure user owns note à token de l'user =>  c'est le log de l'us
  if (content.frenchId.toString() !== req.french.id) {
    return next(new ErrorResponse(`Not Authorized`, 401));
  }
  content = await ChoiceFrench.findByIdAndUpdate(
    req.params.id,
    { $set: choiceFields },
    { new: true, runValidators: true }
  );
  res.status(200).json({ success: true, content });
});

// delete a answer
// //@route                DELETE /api/v2/answers/:id
// //@desc(description)    Delete single answer
// //@access               Private
exports.deleteChoice = asyncHandler(async (req, res, next) => {
  let content = await ChoiceFrench.findById(req.params.id);
  if (!content) {
    return next(new ErrorResponse(`Cannot found choice id ${req.params.id}`));
  }
  //make sure french owns contact
  if (content.frenchId.toString() !== req.french.id) {
    return next(
      new ErrorResponse(`Cannot delete choice id ${req.params.id}`, 401)
    );
  }
  // we don't need a variables cause we don't need to put anything
  // Don't use the delete cause this application use this methode
  // just pass the req.params.id
  content = await ChoiceFrench.findByIdAndRemove(req.params.id);
  //  .then(() =>
  res.status(200).json({ success: true, data: {} });

  // .catch(() => {
  // console.error(err.message);
  // res.status(500).send('Server Error');
  // })
  // );

  // Note.deleteOne({ _id: req.params.id }, function (err) {
  //   if (err) {
  //     res.status(400).json(err);
  //   } else {
  //     res.status(201).json({ message: 'note effacé' });
  //   }
  // });
});
