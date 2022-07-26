const express = require('express');
const mysql= require('mysql');
const bodyParser = require('body-parser');

var reservationRouter = express.Router();


reservationRouter.use(bodyParser.json());
reservationRouter.use(bodyParser.urlencoded({extended: false}));

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'admin',
    password : 'engage12!@',
    database : 'ursdata'
});


reservationRouter.post('/createreservation', async (req, res) => {
    var reservation = {
        u_id: req.body.u_id,
        l_id: req.body.l_id,
        username: req.body.username,
        locationname: req.body.locationname,
        start_time: req.body.start_time,
        finish_time: req.body.finish_time,
        activity_name: req.body.activity_name
    }

    // await connection.query(`INSERT INTO reservations (u_id, l_id, username, locationname, start_time, finish_time, activity_name)`)
    
    
    // var user = {
    //     u_id: -9999,
    //     email: req.body.email,
    //     password: req.body.password
    // }

    //     await connection.query(`INSERT INTO users (email, password) VALUES ("${user.email}", "${user.password}");`, (error, result, fields) => {
    //         if(error) {
    //             console.log(error);
    //             if(error.code === "ER_DUP_ENTRY") {
    //                 res.statusCode = 409;
    //                 res.send("Email already exists");
    //             } else {
    //                 res.statusCode = 400;
    //                 res.send("Bad request");
    //             }
    //         } else {
    //             console.log(result);
    //             res.statusCode = 201;
    //             res.setHeader('Content-Type', 'text/json');
    //             res.json(user);
    //         }
    //     });
});


module.exports = reservationRouter;