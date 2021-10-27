const mongoose = require('mongoose');

const choiceMathSchema = new mongoose.Schema({
  mathId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Maths',
  },
  choice: {
    type: 'string',
    required: true,
    ref: 'Maths',
  },
  correct: { type: Boolean, default: false },
  createAt: {
    type: 'date',
    default: Date.now,
  },
});

module.exports = mongoose.model('ChoiceMath', choiceMathSchema);
