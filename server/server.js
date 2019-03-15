require('dotenv').config(); // this allows us to use the process variables
const express = require('express');
const bodyParser = require("body-parser"); // Requiring body-parser to obtain the body from post requests
const passport = require('passport');
const db = require('../db/models');
const LocalStrategy = require('passport-local').Strategy;
const app = express();
const port = process.env.PORT || 3000;
const { createUser, login } = require('../db/helpers/request-handlers')
// Set Express to use body-parser as a middleware //
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  function (username, password, done) {
    db.User.findOne({ where: { email: username } }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      } 
      return done(null, user);
    });
  }
));

app.get("/", (req, res) => {
  res.status(200).send("Yea this works");
});

app.post('/login', passport.authenticate('local'),  login);  


app.post("/signup", (req, res) => {
  const userInfo = req.body;
  res.status(201).send(userInfo);
});

app.post('/create', createUser);



app.listen(port, () => console.log(`Listening on port ${port}`));