const fs = require('fs');
const http = require('http');
const https = require('https');
const path = require('path');
const express = require('express');
const mysql= require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'admin',
  password : 'engage12!@',
  database : 'ursdata'
});

const app = express();
app.use(express.json());


/////////////////////////////////////////////////////////////////////

const userRouter = require('./routes/userrouter');
app.use('/user', userRouter);

const authRouter = require('./routes/authrouter');
app.use('/auth', authRouter);

// const locationRouter = require('./routes/locationrouter');
// app.use('/location', locationRouter);

// const reservationRouter = require('./routes/reservationrouter');
// app.use('/reservation', reservationRouter);


/////////////////////////////////////////////////////////////////////


connection.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

app.listen(80, () => {
    console.log('Server started at port 80');
});
