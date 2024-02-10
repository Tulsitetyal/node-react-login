const express = require('express');
const mysql = require('mysql');
const cors= require('cors');


const app = express();

app.use(cors());

app.use(express.json());

const db=mysql.createConnection({
    host: 'sql6.freesqldatabase.com',
    user: 'sql6682958',
    password: 'W41YMe33kj',
    database: 'sql6682958'
})

app.post('/signup',(req,res)=>{
    const sql = "INSERT INTO login (`first_name`, `last_name`, `email`,`age`,`dob`,`password`) VALUES (?)";
    const values = [
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.age,
        req.body.dob,
        req.body.password
        
    ];
    db.query(sql,[values],(err,data)=>{
        if(err){
            return res.json("Error");
        }
        return res.json(data);
    }) 
})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE email = ? AND password = ?";
    
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            console.error("Database error:", err.message);
            return res.status(500).json({ error: "Database error" });
        }
        if (data.length > 0) {
            return res.json("Success");
        } else {
            return res.json("Fail");
        }
    });
});



app.get('/getUserDetails', (req, res) => {
   
    const sql = "SELECT * FROM login";
    db.query(sql,(err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error fetching user details" });
        }
         else {
            return res.json(data);
        }
    });
});


app.put('/editUserDetail/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const sql =
    "SELECT * FROM login `firstName`=?, `lastName`=?, `email`=?, `age`=?, `dob`=?, WHERE id = ?";
  const values = [
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.age,
    req.body.dob,
  ];
  db.query(sql, [...values, bookId], (err, data) => {
    if (err) {
      console.error("Database error:", err.message);
      return res.status(500).json({ error: "Database error" });
    } else {
      return res.json("Book has been updated successfully");
    }
  });
});


app.listen(8081,(req,res) => {
console.log("Server is live on port 8081")
});