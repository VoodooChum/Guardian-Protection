require('dotenv').config(); // this allows us to use the process variables
const express = require('express');
const bodyParser = require("body-parser"); // Requiring body-parser to obtain the body from post requests
const passport = require('passport');
const db = require('../db/models');
const LocalStrategy = require('passport-local').Strategy;
const MessagingResponse = require("twilio").twiml.MessagingResponse;
const axios = require("axios");
const app = express();
const client = require("twilio")(  
  process.env.ACCOUNT_SID,
  process.env.AUTH_TOKEN
);
const port = process.env.PORT || 3000; 
const { 
        createUser, 
        login, 
        signup, 
        joinGroup,
        createGroup,
        getMyGroups,
        upload,
        createLocation,
        groupMembers,
        getLocation,
        getChatId,
        getRoutes,
        getScheduleForToday,
        createRoute,
        createSchedule,
        savePushToken
      } = require('../db/helpers/request-handlers')
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

//login

app.post('/login', passport.authenticate('local'), login);

app.post("/signup", signup);

//group
app.post('/create', createUser);

app.post('/upload', upload);

app.post("/createGroup", createGroup);

app.post("/joinGroup", joinGroup); 
 
app.get("/myGroups/:id", getMyGroups ); 
 
app.get("/groupMembers/:groupName", groupMembers);

app.get('/chatId/:groupName', getChatId);

// Sending Messages from Panic to Group Members
app.post("/api/messages", (req, res) => {
  axios.post(`https://exp.host/--/api/v2/push/send`, {
    "to": "ExponentPushToken[UecR7pHDtX3OXW9JhsD1gz]", "body": "Guardian Alert" })
    res.send('Push Complete');
});

// Responding to Incoming Messages
app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();
  let message = req.body.Body;
  console.log(req.body.Body);
  if (message === 'Tiffany' || message ==='tiffany') {
    twiml.message("The Guardian App Loves You Tiffany!!!");
  } 
  else if (message === 'Brian') {
    twiml.message("Hello Brian Welcome to Guardian!!!"); 
  } else {
    twiml.message('Gaurdian App Is Taking Over The World!!!');
  }

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});

app.post('/locations/create', createLocation);

app.post("/push/token", savePushToken); 

app.get('/locations/:id', getLocation);

app.post('/schedule/create', createSchedule);

app.post('/route/create',createRoute);

app.get('/route/retrieve/:id', getRoutes);

app.get('/schedule/retrieve', getScheduleForToday);

app.listen(port, () => console.log(`Listening on port ${port}`));