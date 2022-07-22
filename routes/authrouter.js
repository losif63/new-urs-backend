const express = require('express');
const mysql= require('mysql');
const bodyParser = require('body-parser');

var authRouter = express.Router();

authRouter.use(bodyParser.json());
authRouter.use(bodyParser.urlencoded({extended: false}));

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'admin',
    password : 'engage12!@',
    database : 'ursdata'
});

authRouter.get('/login', (req, res) => {
    var user = {
        email: req.body.email,
        password: req.body.password
    }
    
    await connection.query(`SELECT * FROM users WHERE email='${user.email}' AND password='${user.password}'`, (error, results, fields) => {
        if(error) {
            res.statusCode = 400;
            res.send("Error. Try again.");   
        } else if (results.length === 0) {
            res.statusCode = 404;
            res.send("Email or Password Invalid. Try again.");
        } else {
            res.statusCode = 200;
            res.send("Login Successful");
        }
    });
});