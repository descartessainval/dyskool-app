const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET_KEY;
const AnswerMath = require('../models/AnswerMath');
const Maths = require('../models/Math');

//create answer

//Route                 POST /api/v2/answers
//@desc(description)    Add a new answer
//@access               Private for french
exports.createAnswer = async (req, res, next) => {
  if (!req.Maths.id) {
    res
      .status(400)
      .json({ message: 'paramters missing or math exercice not found' });
  } else {
    const answer = new AnswerMath({
      mathId: req.Maths.id,
      answer: req.body.answer,
    });
    answer.save({ _id: req.params.id }).then((newAnswer) => {
      console.log(newAnswer);
      // ATTENTION
      // Ici je rajoute l'id dans le document note du model User
      Maths.updateOne({ _id: answer.mathId }, { $push: { answers: newAnswer } })
        .then((data) => {
          console.log(data);
          res.status(200).json({ data: Maths });
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
exports.getAnswers = async (req, res, next) => {
  AnswerMath.find({ mathId: req.Maths.id })
    .sort({
      date: -1,
    })
    .then((answers) =>
      res.status(201).json({ count: answers.length, answers: answers })
    )
    .catch((err) => res.status(400).json({ error: err }));
};

// retrieve  answer by ID
//route                 GET /api/v2/answers/:id
//@desc(description)    Get single answer
//@access               Private
exports.getAnswer = async (req, res, next) => {
  AnswerMath.findOne({ _id: req.params.id }, function (err, answer) {
    if (err) {
      res.status(400).json({ err });
    } else {
      res.status(201).json({ answer });
    }
  });
};

// update a note by id
//Route                 POST /api/v2/notes
//@desc(description)    Update a single note
//@access               Private
exports.modifyAnswer = asyncHandler(async (req, res, next) => {
  const { answer } = req.body;
  // builds note object
  const answerFields = {};
  if (answer) answerFields.answer = answer;
  const id = req.params.id;
  let content = await AnswerMath.findById(id);
  if (!content) {
    return next(
      new ErrorResponse(
        `cannot update answer  with  id-${id}, maybe math exercice is not found `,
        404
      )
    );
  }
  // make sure user owns note à token de l'user =>  c'est le log de l'user
  if (content.mathId.toString() !== req.Maths.id) {
    return next(new ErrorResponse(`Not Authorized`, 401));
  }
  content = await AnswerMath.findByIdAndUpdate(
    req.params.id,
    { $set: answerFields },
    { new: true, runValidators: true }
  );
  res.status(200).json({ success: true, content });
});

// delete a answer
// //@route                DELETE /api/v2/answers/:id
// //@desc(description)    Delete single answer
// //@access               Private
exports.deleteAnswer = asyncHandler(async (req, res, next) => {
  let content = await AnswerMath.findById(req.params.id);
  if (!content) {
    return next(new ErrorResponse(`Cannot found answer id ${req.params.id}`));
  }
  //make sure french owns contact
  if (content.mathId.toString() !== req.Maths.id) {
    return next(
      new ErrorResponse(`Cannot delete answer id ${req.params.id}`, 401)
    );
  }
  // we don't need a variables cause we don't need to put anything
  // Don't use the delete cause this application use this methode
  // just pass the req.params.id
  content = await AnswerMath.findByIdAndRemove(req.params.id);
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
