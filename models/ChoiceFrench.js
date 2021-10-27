const mongoose = require('mongoose');

const choiceFrenchSchema = new mongoose.Schema({
  frenchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'French',
  },
  choice: {
    type: 'string',
    required: true,
    ref: 'French',
  },
  correct: { type: Boolean, default: false },
  createAt: {
    type: 'date',
    default: Date.now,
  },
});

module.exports = mongoose.model('ChoiceFrench', choiceFrenchSchema);
