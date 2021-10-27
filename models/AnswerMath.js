const mongoose = require('mongoose');

const answerMathSchema = new mongoose.Schema({
  mathId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Maths',
  },
  answer: {
    type: 'string',
    required: true,
    ref: 'Maths',
  },
  createAt: {
    type: 'date',
    default: Date.now,
  },
});

module.exports = mongoose.model('AnswerMath', answerMathSchema);
