const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

app.use(cors());
//app.use(express.json());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
});
const dbdonation = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "donation"
});

const dbchildren = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "children"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL databasesignup');
});

dbdonation.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL databasedonation');
});

// dbadoption.connect((err) => {
//     if (err) {
//         console.error('Error connecting to MySQL database:', err);
//         return;
//     }
//     console.log('Connected to MySQL databaseadoption');
// });
dbchildren.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL databasechildren');
});

app.post('/signup', (req, res) => {
    const email = req.body.email;
    const sqlCheckEmail = "SELECT * FROM login WHERE email = ?";

    db.query(sqlCheckEmail, email, (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).json({ error: "Error occurred while checking for existing email" });
        }

        if (result.length > 0) {
            // Email already exists, send error response
            return res.status(409).json({ error: "Email already exists" });
        } else {
            // Email doesn't exist, proceed with signup
            const sqlSignUp = "INSERT INTO login (name, email, password) VALUES (?, ?, ?)";
            const values = [req.body.name, req.body.email, req.body.password];

            db.query(sqlSignUp, values, (err, result) => {
                if (err) {
                    console.error("Error executing query:", err);
                    return res.status(500).json({ error: "Error occurred while signing up" });
                }
                console.log("User signed up successfully:", result);
                return res.status(200).json({ message: "User signed up successfully" });
            });
        }
    });
});



app.post('/login', (req, res) => {
    

    const sql = "SELECT * FROM login WHERE email = ? AND password = ?";
    const values = [req.body.email, req.body.password];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).json({ error: "Error occurred while processing login request" });
        }

        if (result.length > 0) {
           
            return res.status(200).json({ message: "Success" });
        } else {

            return res.status(401).json({ error: "IncorrectPassword" });
        }
    });
});

app.post('/adminlogin', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Please provide email and password" });
    }

    const sql = "SELECT * FROM adminsignup WHERE email = ? AND password = ?";
    const values = [email, password];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).json({ error: "Error occurred while processing login request" });
        }

        if (result.length > 0) {
            // Admin found, send success response
            return res.status(200).json({ message: "Success" });
        } else {
            // No admin found or incorrect password, send failure response
            return res.status(401).json({ error: "IncorrectCredentials" });
        }
    });
});

app.post('/donation', (req, res) => {
    const { name, email, address, dob, occupation, phoneNumber, product, paymentMethod, amount, accountNumber, donateddate } = req.body;

    const sql = "INSERT INTO donation (name, email, address, dob, occupation, phone_no, products, payment_mode, amount, accountno, donateddate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [name, email, address, dob, occupation, phoneNumber, product, paymentMethod, amount, accountNumber, donateddate];

    dbdonation.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).json({ error: "Error occurred while inserting data" });
        }
        console.log("Data successfully inserted:", result);
        return res.status(200).json({ message: "Data successfully inserted" });
    });
});

app.post('/adoption', (req, res) => {
    const { firstName, lastName, dob,placeOfBirth, gender, phoneNumber, email,occupation,salary,maritalStatus, residedInAnotherState, streetAddress, city, region, pincode, contactMethod,child_id,child_name } = req.body;

    const sql = "INSERT INTO adoption (firstName, lastName, dob,placeOfBirth, gender, phoneNumber, email,occupation,salary,maritalStatus, residedInAnotherState, streetAddress, city, region, pincode, contactMethod,child_id,child_name) VALUES (?,?,?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,? ,?,?,?)";
    const values = [firstName, lastName, dob,placeOfBirth, gender, phoneNumber, email,occupation,salary,maritalStatus, residedInAnotherState, streetAddress, city, region, pincode, contactMethod,child_id,child_name];

    dbchildren.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).json({ error: "Error occurred while inserting data" });
        }
        console.log("Data successfully inserted:", result);
        return res.status(200).json({ message: "Data successfully inserted" });
    });
});


app.post('/children', async (req, res) => {
    try {
        const childData = req.body;
        console.log(req.body);
        console.log('Received childData:', childData);

        const childrenQuery = `INSERT INTO children (name, gender, dob, age, placeOfBirth, school, class, sibilings, parentGuardian, imageSrc) 
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const childrenValues = [
            childData.name,
            childData.gender,
            childData.dob,
            childData.age,
            childData.placeOfBirth,
            childData.school,
            childData.class,
            childData.siblings,
            childData.parentGuardian,
            childData.imageSrc
        ];

        dbchildren.query(childrenQuery, childrenValues, (err, result) => {
            if (err) {
                if (err.sqlState === '45000') {
                    console.error('Error inserting age', err);
                    return res.status(400).json({ error: 'Age should be below 15' });
                }
    
                console.error('Error inserting into children table:', err);
                return res.status(500).json({ error: 'Error inserting child data' });
            }

            const childId = result.insertId;

            if (childData.parentGuardian === 'guardian') {
                const guardianQuery = `INSERT INTO guardian (id, name, guardianname, guardianaddress, guardianphoneNumber, guardianemail, guardianoccupation, guardianrelationship) 
                                        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
                const guardianValues = [
                    childId,
                    childData.name,
                    childData.guardianDetails.name,
                    childData.guardianDetails.address,
                    childData.guardianDetails.phoneNumber,
                    childData.guardianDetails.email,
                    childData.guardianDetails.occupation,
                    childData.guardianDetails.relationship
                ];

                dbchildren.query(guardianQuery, guardianValues, (err) => {
                    if (err) {
                        console.error('Error inserting into guardian table:', err);
                        return res.status(500).json({ error: 'Error inserting guardian data' });
                    }
                    res.status(201).json({ message: 'Data inserted successfully' });
                });
            } else {
                const parentQuery = `INSERT INTO parentsinfo (id, name, fathername, fatherqualification, fatheroccupation, fatherphoneNumber, 
                                                            mothername, motherqualification, motheroccupation, motherphoneNumber, address) 
                                      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
                const parentValues = [
                    childId,
                    childData.name,
                    childData.parentDetails.father.name,
                    childData.parentDetails.father.qualification,
                    childData.parentDetails.father.occupation,
                    childData.parentDetails.father.phoneNumber,
                    childData.parentDetails.mother.name,
                    childData.parentDetails.mother.qualification,
                    childData.parentDetails.mother.occupation,
                    childData.parentDetails.mother.phoneNumber,
                    childData.parentDetails.address
                ];

                dbchildren.query(parentQuery, parentValues, (err) => {
                    if (err) {
                        console.error('Error inserting into parentinfo table:', err);
                        return res.status(500).json({ error: 'Error inserting parent data' });
                    }
                    res.status(201).json({ message: 'Data inserted successfully' });
                });
            }
        });
    } catch (err) {
        console.error('Error handling request:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/children', (req, res) => {
    const query = `
        SELECT 
            c.*,
            p.fathername, p.fatherqualification, p.fatheroccupation, p.fatherphoneNumber,
            p.mothername, p.motherqualification, p.motheroccupation, p.motherphoneNumber, p.address,
            g.guardianname, g.guardianaddress, g.guardianphoneNumber, g.guardianemail, g.guardianoccupation, g.guardianrelationship
        FROM children c
        LEFT JOIN parentsinfo p ON c.id = p.id
        LEFT JOIN guardian g ON c.id = g.id
    `;
    dbchildren.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching children data:', err);
            return res.status(500).json({ error: 'Error fetching children data' });
        }
        res.status(200).json(results);
    });
});



app.put('/children/:id', (req, res) => {
    const childId = req.params.id;
    const childData = req.body;

    const updateChildQuery = `UPDATE children SET name = ?, gender = ?, dob = ?, age = ?, placeOfBirth = ?, school = ?, class = ?, sibilings = ?, parentGuardian = ?
                              WHERE id = ?`;
    const updateGuardianQuery = `UPDATE guardian SET name = ? WHERE id = ?`;
    const updateParentInfoQuery = `UPDATE parentsinfo SET fathername = ?, mothername = ? WHERE id = ?`;

    const updateChildValues = [
        childData.name,
        childData.gender,
        childData.dob,
        childData.age,
        childData.placeOfBirth,
        childData.school,
        childData.class,
        childData.siblings,
        childData.parentGuardian,
        childId
    ];

    const updateGuardianValues = [
        childData.guardianDetails.name,
        childId  
    ];

    const updateParentInfoValues = [
        childData.parentDetails.father.name,
        childData.parentDetails.mother.name,
        childId
    ];

    dbchildren.beginTransaction((err) => {
        if (err) {
            console.error('Error starting transaction:', err);
            return res.status(500).json({ error: 'Error updating child data' });
        }

        dbchildren.query(updateChildQuery, updateChildValues, (err, result) => {
            if (err) {
                console.error('Error updating child data:', err);
                return dbchildren.rollback(() => {
                    res.status(500).json({ error: 'Error updating child data' });
                });
            }

            dbchildren.query(updateGuardianQuery, updateGuardianValues, (err, result) => {
                if (err) {
                    console.error('Error updating guardian data:', err);
                    return dbchildren.rollback(() => {
                        res.status(500).json({ error: 'Error updating guardian data' });
                    });
                }

                dbchildren.query(updateParentInfoQuery, updateParentInfoValues, (err, result) => {
                    if (err) {
                        console.error('Error updating parents info:', err);
                        return dbchildren.rollback(() => {
                            res.status(500).json({ error: 'Error updating parents info' });
                        });
                    }

                    dbchildren.commit((err) => {
                        if (err) {
                            console.error('Error committing transaction:', err);
                            return dbchildren.rollback(() => {
                                res.status(500).json({ error: 'Error updating child data' });
                            });
                        }

                        res.status(200).json({ message: 'Child updated successfully' });
                    });
                });
            });
        });
    });
});


// Endpoint to delete a child by ID
app.delete('/children/:id', (req, res) => {
    const childId = req.params.id;
    const deleteChildQuery = 'DELETE FROM children WHERE id = ?';
    const deleteParentQuery = 'DELETE FROM parentsinfo WHERE id = ?';
    const deleteGuardianQuery = 'DELETE FROM guardian WHERE id = ?';

    let deleteErrors = [];
    let completedQueries = 0;

    const handleQueryCompletion = (err, message) => {
        if (err) {
            deleteErrors.push(err);
        }
        completedQueries++;
        if (completedQueries === 3) {
            if (deleteErrors.length > 0) {
                console.error('Errors during deletion:', deleteErrors);
                return res.status(500).json({ error: 'Errors occurred during deletion', details: deleteErrors });
            }
            res.status(200).json({ message: 'Child, parent, and guardian data deleted successfully' });
        }
    };

    dbchildren.query(deleteChildQuery, [childId], (err, result) => {
        handleQueryCompletion(err, 'Child deleted successfully');
    });

    dbchildren.query(deleteGuardianQuery, [childId], (err, result) => {
        handleQueryCompletion(err, 'Guardian deleted successfully');
    });

    dbchildren.query(deleteParentQuery, [childId], (err, result) => {
        handleQueryCompletion(err, 'Parent deleted successfully');
    });
});

app.get('/adoption', (req, res) => {
    const sql = "SELECT * FROM adoption";
    dbchildren.query(sql, (err, results) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).json({ error: "Error occurred while retrieving data" });
        }
        return res.status(200).json(results);
    });
});

// Delete adoption data by id
app.delete('/adoption/:id', (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM adoption WHERE id = ?";
    dbchildren.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).json({ error: "Error occurred while deleting data" });
        }
        console.log("Data successfully deleted:", result);
        return res.status(200).json({ message: "Data successfully deleted" });
    });
});
app.get('/donations/:date', (req, res) => {
    const { date } = req.params;
    console.log(`Fetching donations for date: ${date}`);
    const sql = 'SELECT * FROM donation WHERE donateddate = ?';
    dbdonation.query(sql, [date], (err, results) => {
        if (err) {
            console.error('Error fetching data:', err.message, err.stack);
            res.status(500).send('Server error');
            return;
        }
        console.log('Fetched donations:', results);
        res.json(results);
    });
});



// Delete a donation by ID
app.delete('/donations/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM donation WHERE id = ?';
    dbdonation.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Error deleting data:', err);
            res.status(500).send('Server error');
            return;
        }
        res.json({ success: true });
    });
});

app.get('/children/count', (req, res) => {
    dbchildren.query('SELECT COUNT(*) AS count FROM children', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ count: results[0].count });
    });
});

// Endpoint to get count of adoptions
app.get('/adoption/count', (req, res) => {
    dbchildren.query('SELECT COUNT(*) AS count FROM adoption', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ count: results[0].count });
    });
});

// Endpoint to get count of donations
app.get('/donation/count', (req, res) => {
    dbdonation.query('SELECT COUNT(*) AS count FROM donation', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ count: results[0].count });
    });
});


const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});