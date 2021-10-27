const mongoose = require('mongoose');
const config = require('config');
const db = config.get('url');

const connectDB = () => {
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => console.log('MongoDB connected...'.cyan.underline.bold))
    .catch(() => console.log('connection mongodb failed'));
};
module.exports = connectDB;

//the same in
//async structure
// const connectDB = async () => {
//     try {
//       await mongoose.connect(db, {
//         useNewUrlParser: true,
//         useCreateIndex: true,
//         useFindAndModify: false,
//         useUnifiedTopology: true,
//       });
//       console.log('MongoDB Connected...');
//     } catch (err) {
//       console.error(err.message);
//       process.exit(1);
//     }
//   };
