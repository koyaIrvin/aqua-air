const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require('bcrypt');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "larawan",
    password: "Forever116@@",
    database: "aqua_air"
});

app.post('/create', (req, res) => {
    const name = req.body.name;
    const username = req.body.username;
    const plainPassword = req.body.password;
    const bio = req.body.bio;

    const saltRounds = 10;

    bcrypt.hash(plainPassword, saltRounds, (err, hashedPassword) => {
        if(err){
            console.log(err);
            res.status(500).json({ error: 'Error hashing the password' });
        } else {
            db.query("INSERT INTO members (name, username, password, bio) VALUES (?, ?, ?, ?)",  [name, username, hashedPassword, bio], (dbErr, result) => {
                if(dbErr){
                    console.log(dbErr);
                    res.status(500).json({ error: 'Error inserting data into the database' });
                } else {
                    res.send("Values Inserted");
                }
            });
        }
    });
});

app.get('/read', (req, res) =>{
    db.query("SELECT * FROM members", (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

app.put('/update',(req, res) => {
    const id = req.body.id;
    const bio = req.body.bio;
    db.query("UPDATE members SET bio = ? WHERE id = ?", [bio, id], (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM members WHERE id = ?", id, (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
});

app.listen(3001, () => {
    console.log("Yay! You're server is running on port 3001");
});