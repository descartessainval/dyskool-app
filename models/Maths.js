const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// step 1
// const answerSchema = new mongoose.Schema({
// answer: { type: String, required: true },
// correct: { type: Boolean, required: true },
// });
//
// const propositionSchema = new mongoose.Schema({
// proposition: { type: String, required: true },
// correct: { type: Boolean, required: true },
// });

const mathSchema = new mongoose.Schema({
  matter: { type: String, enum: ['maths'], required: true },
  picture: { type: String, required: true },
  name: { type: String, required: true },
  rule: { type: String, required: true },
  answers: [{ type: Schema.Types.ObjectId, ref: 'AnswerMath' }],
  choices: [{ type: Schema.Types.ObjectId, ref: 'ChoiceMath' }],
  // validAnswers: [answerSchema],
  // propositions: [propositionSchema],
  createAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Math', mathSchema);

// exemple d'exercices de math:
// {
// 	"matter":"Maths",
// 	"name":"Le juste compte !",
//  "rule":"Retrouve le ou les nombres valides pour complèter l'opération suivante :",
// 	"picture":"/exercice-math-.png",
// 	"validAnswers":[
// 		{"answer": "2", "correct": true},
// 		{"answer": "3", "correct": true}
// 	],
// 	"propositions":[
// 		{"proposition": "2", "correct": true},
// 		{"proposition": "0", "correct": false},
// 		{"proposition": "5", "correct": false},
// 		{"proposition": "3", "correct": true}
// 	]
// }

// {
//     "matter":"Maths",
//     "name":"Le juste compte !",
//     "rule":"Retrouve le ou les nombres valides pour complèter l'opération suivante :",
//     "picture":"/exercice-math-.png",
//     "validAnswers":[
//         {"answer": "4", "correct": true}
//     ],
//     "propositions":[
//         {"proposition": "5", "correct": false},
//         {"proposition": "4","correct": true},
//         {"proposition": "2","correct": false},
//         {"proposition": "0.5","correct": false}
//     ]
// }

//comment récup les enum
// matter: {string: 'string', enum: ['français', 'math']},
