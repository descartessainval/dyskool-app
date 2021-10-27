const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET_KEY;
const Note = require('../models/Note');
const User = require('../models/user');

//create note

//Route                 POST /api/v2/notes
//@desc(description)    Add a new note
//@access               Private for user
exports.createNote = async (req, res, next) => {
  if (!req.user.id) {
    res.status(400).json({ message: 'paramters missing or user not found' });
  } else {
    const note = new Note({
      userId: req.user.id,
      note: req.body.note,
    });
    note.save({ _id: req.params.id }).then((newNote) => {
      console.log(newNote);
      // ATTENTION
      // Ici je rajoute l'id dans le document note du model User
      User.updateOne({ _id: note.userId }, { $push: { notes: newNote } })
        .then((data) => {
          console.log(data);
          res.status(200).json({ data: note });
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
exports.getNotes = async (req, res, next) => {
  Note.find({ userId: req.user.id })
    .sort({
      date: -1,
    })
    .then((notes) =>
      res.status(201).json({ count: notes.length, notes: notes })
    )
    .catch((err) => res.status(400).json({ error: err }));
};

// retrieve  note by ID
//route                 GET /api/v2/notes/:id
//@desc(description)    Get single note
//@access               Private
exports.getNote = async (req, res, next) => {
  Note.findOne({ _id: req.params.id }, function (err, note) {
    if (err) {
      res.status(400).json({ err });
    } else {
      res.status(201).json({ note });
    }
  });
};

// update a note by id
//Route                 POST /api/v2/notes
//@desc(description)    Update a single note
//@access               Private
exports.modifyNote = asyncHandler(async (req, res, next) => {
  const { note } = req.body;
  // builds note object
  const noteFields = {};
  if (note) noteFields.note = note;
  const id = req.params.id;
  let content = await Note.findById(id);
  if (!content) {
    return next(
      new ErrorResponse(
        `cannot update note  with  id-${id}, maybe note is not found `,
        404
      )
    );
  }
  // make sure user owns note à token de l'user =>  c'est le log de l'user
  if (content.userId.toString() !== req.user.id) {
    return next(new ErrorResponse(`Not Authorized`, 401));
  }
  content = await Note.findByIdAndUpdate(
    req.params.id,
    { $set: noteFields },
    { new: true, runValidators: true }
  );
  res.status(200).json({ success: true, content });
});

// delete a note
// //@route                DELETE /api/v2/notes/:id
// //@desc(description)    Delete single note
// //@access               Private
exports.deleteNote = asyncHandler(async (req, res, next) => {
  let content = await Note.findById(req.params.id);
  if (!content) {
    return next(new ErrorResponse(`Cannot found note id ${req.params.id}`));
  }
  //make sure user owns contact
  if (content.userId.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`Cannot delete note id ${req.params.id}`, 401)
    );
  }
  // we don't need a variables cause we don't need to put anything
  // Don't use the delete cause this application use this methode
  // just pass the req.params.id
  content = await Note.findByIdAndRemove(req.params.id);
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
