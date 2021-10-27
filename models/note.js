const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  note: {
    type: 'string',
    required: true,
    ref: 'user',
  },
  date: {
    type: 'date',
    default: Date.now,
  },
});

module.exports = mongoose.model('Note', noteSchema, 'note');

// const mongoose = require("mongoose");
// en es6 import mongoose from mongoose;
// const note = mongoose.model(
//     "Note",
//     new mongoose.Schema({
//         note : {
//             type: "string",
//             ref:"user"
//         },
//         user_id: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'user'
//         },
//         date: {
//             type: "date",
//             default: Date.now
//         }
//     })
// );
// module.exports = note;
