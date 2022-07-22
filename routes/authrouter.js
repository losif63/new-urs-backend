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

authRouter.get('/login', async (req, res) => {
    var user = {
        u_id: -9999,
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
            user.u_id = results[0].u_id;
            res.statusCode = 200;
            res.send(user);
        }
    });
});


module.exports = authRouter;