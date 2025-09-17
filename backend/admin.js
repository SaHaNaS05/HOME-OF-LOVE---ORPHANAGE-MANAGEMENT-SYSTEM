const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
});

app.use(cors());
app.use(express.json());

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login (name, email, password) VALUES (?, ?, ?)";
    const values = [req.body.name, req.body.email, req.body.password];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).json({ error: "Error occurred while signing up" });
        }
        console.log("User signed up successfully:", result);
        return res.status(200).json({ message: "User signed up successfully" });
    });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});