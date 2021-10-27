//Model User
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  name: { type: String, trim: true, unique: true, required: true },
  pseudo: { type: String, unique: true, unique: true, required: true },
  email: { type: String, unique: true, lowercase: true, required: true },
  password: { type: String, required: true },
  admin: { type: Boolean, default: false },
  notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }],
  createAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('user', userSchema);

// const { genSalt } = require('bcryptjs');
// Creation of a User model with the constructor mongoose.Schema () function
// Création d'un modèle User avec la fonction constructor mongoose.Schema()
// resetPasswordToken: String,
// resetPasswordExpire: Date,
// role: {
//   type: [String],
//   enum: ['learner'],
//   default: 'learner',
// },

// just for fun => me permet de hasher mon password du model user/ dans mon schema
// c'est pas génial la vie
// userSchema.pre('save', async () => {
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

// method signed jwttoken que
// userSchema.methods.signedJwtToken = function () {
//   retrun;
//   jwt.sign;
//   ({ id: this._id },
//     process.env.JTW_SECRET,
//     {
//       expireIn: process.env.JTW_EXPIRE,
//     });
// };

// AUTRE MANIERE DE CONSTRUIRE SON MODELE
// const mongoose = require("mongoose");
// const User = mongoose.model(
//     "User",
//     new mongoose.Schema({
//         name: {
//             type: String,
//             unique: true,
//             required: true
//         },
//         pseudo:{
//             type: String,
//             unique: true,
//             required: true
//         },
//         email: {
//             type: String,
//             unique: true,
//             required: true,
//             lowercase: true
//         },
//         password: {
//             type: String,
//             required: true
//         },
//         admin: {
//             type: Boolean,
//             default: false
//         },
//         notes: [{type: Schema.Types.ObjectId, ref:'Note'}]
//     })
// );
// module.exports = User;
