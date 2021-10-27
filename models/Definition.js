const mongoose = require('mongoose');

const defintionSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  picture: { type: String, required: false },
  link: { type: String, required: false },
});

module.exports = mongoose.model('Defintion', defintionSchema);
