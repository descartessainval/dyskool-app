const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//step1
// const answerSchema = new mongoose.Schema({
// answer: { type: String, required: true },
// correct: { type: Boolean, required: true },
// });
//
// const propositionSchema = new mongoose.Schema({
// proposition: { type: String, required: true },
// correct: { type: Boolean, required: true },
// });

const frenchSchema = new mongoose.Schema({
  matter: {
    type: String,
    enum: ['french'],
    required: true,
  },
  picture: { type: String, required: false },
  name: { type: String, required: true },
  rule: { type: String, required: true },
  // validAnswers: [answerSchema],
  // propositions: [propositionSchema],
  answers: [{ type: Schema.Types.ObjectId, ref: 'AnswerMath' }],
  choices: [{ type: Schema.Types.ObjectId, ref: 'ChoiceMath' }],
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('French', frenchSchema);

// exemple d'exercices de français:
// {
// 	"matter":"Français",
// 	"name":"Qui suis-je",
// 	"rule":"Retrouve les lettres qui correspondent à l'image",
// 	"picture":"/exercice-fr/ballon.png",
// 	"validAnswers":[
// 		{"answer" : "ballon"}
// 		],
// 	"propositions":[
// 		{"proposition": "bal"},
// 		{"proposition": "on"},
// 		{"proposition": "lon"},
// 		{"proposition": "balle"}
// 	]
// }

// {
//     "matter": "Français",
//     "name": "Qui suis-je",
//     "rule": "Retrouve les lettres qui correspondent à l'image",
//     "picture": "/exercice-fr/chapeau.png",
//     "validAnswers": [
//         {"answer": "chapeau", "correct": true}

//     ],
//     "propositions": [
//         {"proposition": "cha", "correct": true},
//         {"proposition": "sha", "correct": false},
//         {"proposition": "pot", "correct": false},
//         {"proposition": "peau", "correct": true}
//     ]
// }
