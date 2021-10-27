// import modules
const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const colors = require('colors');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const bearerToken = require('express-bearer-token');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const errorHandler = require('./middleware/error');

// console.log(result);
//const result = dotenv.config({ path: './config/config.env' });
//if (result.error) {
//  throw result.error;
//}

// middleware
// connect database
connectDB();
//parse requestof content-type -application/x-www-form-urlencoded

//auth
// const Authentificate = require('./middleware/auth');

//route files
const auth = require('./routes/auth');
const user = require('./routes/user');
const maths = require('./routes/maths');
const french = require('./routes/french');
const note = require('./routes/note');
const game = require('./routes/game');
const definition = require('./routes/definition');
const answerMath = require('./routes/answerMath');
const choiceMath = require('./routes/choiceMath');
const answerFrench = require('./routes/answerFrench');
const choiceFrench = require('./routes/choiceFrench');

app = express();

// parse request of content-type -application/json
// app.use(bodyParser.json());

// Sanitize data => prevent injection
app.use(mongoSanitize());

//Set Security headers
app.use(helmet());
app.use(cors());
app.use(bearerToken());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// root
app.route('/').get(function (req, res) {
  res.send('Bienvenue sur le serveur du site Dyskool !');
});

app.use('/api/v2/auth', auth);
app.use('/api/v2/users', user);
app.use('/api/v2/games', game);
app.use('/api/v2/notes', note);

app.use('/api/v2/maths', maths);
app.use('/api/v2/Answers', answerMath);
app.use('/api/v2/choices', choiceMath);

app.use('/api/v2/frenchs', french);
app.use('/api/v2/Answers', answerFrench);
app.use('/api/v2/Choices', choiceFrench);

app.use('/api/v2/definitions', definition);

app.use(errorHandler);

// listening port
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  );
});
