
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const api = require('./controllers');
const auth = require('./auth');
const passportSetup = require('./config/passport-setup');
const session = require('express-session');
const passport = require('passport');
console.log(passportSetup);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', api);
app.use(session({
  secret: 'testsecret', // should be from a config file
  maxAge: 24 * 60 * 60 * 1000,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', auth);
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

app.listen(9000, () => {
  console.log('Server  listening on port 9000!');
});
