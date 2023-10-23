const express = require('express');  //import express from "express"
const sqlite3 = require('sqlite3');

let sql; 

const app = express();  // instance of express middleware

const db = new sqlite3.Database('./users.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// sql =`CREATE TABLE USER2(email,password)`;
// db.run(sql);

app.use(express.json());

const port = 3001;
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
  











app.get('/hello', (req, res) => {
    res.json('I am an API request.');
});

app.post('/register',(req,res)=>{
   try {
    const {email,password}=req.body;
    console.log(email,password)
    sql = `INSERT INTO USER(email,password) VALUES(?,?)`;
    db.run(sql,[email,password],(err)=>{
        if(err){
            
            console.log(err);
            return res.json({status:300,error:err})
        }
        else{
            console.log("registered successfully");

        }
       
    })
    return res.json({
        status:200,
        success:true,
    })
    
   } catch (error) {
    console.log(error);
   }
})
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log(email,password)
    // Use a prepared statement to avoid SQL injection
    const sql = 'SELECT * FROM USER WHERE Email = ? AND password = ?';

    db.get(sql, [email, password], (err, row) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ status: 500, error: 'Internal Server Error' });
        }

        if (row) {
            console.log('Logged in successfully');
            return res.status(200).json({ status: 200, success: true });
        } else {
            console.log('Login failed');
            return res.status(401).json({ status: 401, error: 'Unauthorized' });
        }
    });
});

