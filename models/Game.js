const mongoose = require('mongoose');

//Crud, ici le jeu ne pourra être modifier ou supprimer que par l'admin
const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "name can't be empty",
    unique: true,
  },
  picture: {
    type: String,
    required: true,
    unique: true,
  },
  media: {
    type: String,
    required: "URL can't be empty",
    unique: true,
  },
  rule: {
    type: String,
    required: true,
    unique: true,
  },
});

// phase de validatation peut être avec RegExp.test

module.exports = mongoose.model('Game', gameSchema);
