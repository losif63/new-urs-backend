const express = require('express');
const mysql= require('mysql');
const bodyParser = require('body-parser');

var userRouter = express.Router();


userRouter.use(bodyParser.json());
userRouter.use(bodyParser.urlencoded({extended: false}));

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'admin',
    password : 'engage12!@',
    database : 'ursdata'
});

userRouter.get('/fetchall', (req, res) => {
    connection.query('SELECT * from users', (error, results, fields) => {
        if(error) throw error;
        res.statusCode = 200;
        res.send(results);
        console.log(results);
    });
});

userRouter.post('/createuser', async (req, res) => {
    var user = {
        u_id: -9999,
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
    }

        await connection.query(`INSERT INTO users (email, password, name) VALUES ("${user.email}", "${user.password}", "${user.name}");`, (error, result, fields) => {
            if(error) {
                console.log(error);
                if(error.code === "ER_DUP_ENTRY") {
                    res.statusCode = 409;
                    res.send("Email already exists");
                } else {
                    res.statusCode = 400;
                    res.send("Bad request");
                }
            } else {
                user.u_id = result.insertId;
                console.log(result);
                res.statusCode = 201;
                res.setHeader('Content-Type', 'text/json');
                res.json(user);
            }
        });
});

userRouter.put('/updateuser', async (req, res) => {
    console.log(req.body);
    var user = {
        u_id: req.body.u_id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }

    await connection.query(`UPDATE users SET email='${user.email}', password='${user.password}' WHERE u_id = ${user.u_id}`, (error, result, fields) => {
        console.log(result);
        console.log(error);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/json');
        res.json(user);
    });
});


module.exports = userRouter;