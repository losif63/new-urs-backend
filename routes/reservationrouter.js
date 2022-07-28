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
        r_id: -9999,
        u_id: req.body.u_id,
        l_id: req.body.l_id,
        username: req.body.username,
        start_time: req.body.start_time,
        finish_time: req.body.finish_time,
        activity_name: req.body.activity_name
    }

    await connection.query(`INSERT INTO reservations (u_id, l_id, username, start_time, finish_time, activity_name) VALUES (${reservation.u_id}, ${reservation.l_id}, '${reservation.username}', '${reservation.start_time}', '${reservation.finish_time}', '${reservation.activity_name}')`, (error, result, fields) => {
        if(error) {
            console.log(error);
            res.statusCode = 400;
            res.send("Bad request");
        } else {
            console.log("Create reservation request received");
            reservation.r_id = result.insertId;
            res.statusCode = 200;
            res.json(reservation);
        }
    });
});

reservationRouter.post('/myreservations', async (req, res) => {
    var user = {
        u_id: req.body.u_id
    }

    await connection.query(`SELECT * FROM reservations INNER JOIN locations ON reservations.l_id = locations.l_id WHERE reservations.u_id = ${user.u_id}`, (error, result, fields) => {
        if(error) {
            console.log(error);
            res.statusCode = 400;
            res.send("Bad request");
        } else {
            console.log('Myreservations request received');
            res.statusCode = 200;
            res.send(result);
        }
    });
});

reservationRouter.post('/mycurrentreservations', async (req, res) => {
    var user = {
        u_id: req.body.u_id
    }

    await connection.query(`SELECT * FROM reservations INNER JOIN locations ON reservations.l_id = locations.l_id WHERE reservations.u_id = ${user.u_id} AND reservations.start_time <= CONVERT_TZ(NOW(), "+00:00", "+09:00") AND reservations.finish_time >= CONVERT_TZ(NOW(), "+00:00", "+09:00")`, (error, result, fields) => {
        if(error) {
            console.log(error);
            res.statusCode = 400;
            res.send("Bad request");
        } else {
            console.log('MyCurrentreservations request received');
            res.statusCode = 200;
            res.send(result);
        }
    });
});

reservationRouter.post('/myfuturereservations', async (req, res) => {
    var user = {
        u_id: req.body.u_id
    }

    await connection.query(`SELECT * FROM reservations INNER JOIN locations ON reservations.l_id = locations.l_id WHERE reservations.u_id = ${user.u_id} AND reservations.start_time > CONVERT_TZ(NOW(), "+00:00", "+09:00")`, (error, result, fields) => {
        if(error) {
            console.log(error);
            res.statusCode = 400;
            res.send("Bad request");
        } else {
            console.log('MyFuturereservations request received');
            res.statusCode = 200;
            res.send(result);
        }
    });
});

reservationRouter.post('/mypastreservations', async (req, res) => {
    var user = {
        u_id: req.body.u_id
    }

    await connection.query(`SELECT * FROM reservations INNER JOIN locations ON reservations.l_id = locations.l_id WHERE reservations.u_id = ${user.u_id} AND reservations.finish_time < CONVERT_TZ(NOW(), "+00:00", "+09:00")`, (error, result, fields) => {
        if(error) {
            console.log(error);
            res.statusCode = 400;
            res.send("Bad request");
        } else {
            console.log('MyPastreservations request received');
            res.statusCode = 200;
            res.send(result);
        }
    });
});


reservationRouter.post('/roomreservations', async (req, res) => {
    var location = {
        l_id: req.body.l_id,
        interval_start: req.body.interval_start,
        interval_end: req.body.interval_end
    }

    await connection.query(`SELECT * FROM reservations WHERE l_id = ${location.l_id} AND start_time >= '${location.interval_start}' AND finish_time <= '${location.interval_end}'`, (error, result, fields) => {
        if(error) {
            console.log(error);
            console.log(req.body);
            res.statusCode = 400;
            res.send("Bad request");
        } else {
            console.log('Roomreservations request received');
            console.log(req.body);
            console.log(result);
            res.send(result);
        }
    })
});


reservationRouter.patch('/cancelreservation', async (req, res) => {
    
    await connection.query(`DELETE FROM reservations WHERE r_id = ${req.body.r_id} AND u_id = ${req.body.u_id}`, (error, result, fields) => {
        if(error) {
            console.log(error);
            res.statusCode = 400;
            res.send("Bad request");
        } else {
            console.log('Cancelreservation request received');
            res.send(result);
        }
    });
});


module.exports = reservationRouter;