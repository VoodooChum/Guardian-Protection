require('dotenv').config(); // this allows us to use the process variables
const express = require('express');
const bodyParser = require("body-parser"); // Requiring body-parser to obtain the body from post requests
const passport = require('passport');
const db = require('../db/models');
const LocalStrategy = require('passport-local').Strategy;
const app = express();
const port = process.env.PORT || 3000;
const { createUser, login, signup } = require('../db/helpers/request-handlers')
// Set Express to use body-parser as a middleware //
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.all('*', (req, res, next) => {
  // ugly hack to let the browser know the user is logged in
  // not sure if secure
  if (req.isAuthenticated()) {
    res.set({ Login: 'true', User: req.user.username });
  } else {
    res.set({ Login: '', User: '' });
  }
  next();
});

passport.use(new LocalStrategy(
  function (username, password, done) {
    db.User.findOne({ where: { email: username } })
    .then((user)=>{
      return done(null, user); 
    })
  }
));

passport.serializeUser((user, done) => done(null, user.id));
// saves user id on session

passport.deserializeUser((id, done) => db.User.findOne({ where: { id } })
  .then(user => done(null, user))
  .catch(err => done(err)));
  // associates session with user


app.get("/", (req, res) => {
  res.status(200).send("Yea this works"); 
});

app.post('/login', passport.authenticate('local'), login);


app.post("/signup", signup);

app.post('/create', createUser);



app.listen(port, () => console.log(`Listening on port ${port}`));