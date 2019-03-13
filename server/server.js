require('dotenv').config(); // this allows us to use the process variables
const express = require('express');
const { createUser } =  require('../db/helpers/request-handlers')

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.status(200).send('Yea this works');
})

app.post('/create', createUser);



app.listen(port, () => console.log(`Listening on port ${port}`));