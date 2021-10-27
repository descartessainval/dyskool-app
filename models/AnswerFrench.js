const mongoose = require('mongoose');

const answerFrenchSchema = new mongoose.Schema({
  frenchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'French',
  },
  answer: {
    type: 'string',
    required: true,
    ref: 'French',
  },
  correct: { type: Boolean, default: true },
  createAt: {
    type: 'date',
    default: Date.now,
  },
});

module.exports = mongoose.model('AnswerFrench', answerFrenchSchema);
