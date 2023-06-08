const express = require('express');
const router = express.Router();
const pool = require('../connection');
const bcrypt = require('bcrypt');



// Register User
router.post('/', async (req, res) => {
    // Extract user registration details from the request body
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    // password = bcrypt.hash

    // Return a response indicating successful registration
    // res.status(200).json({ message: `Registration successful. Username: ${username}, password: ${password}` });
    try {
        // Insert the user into the database
        const query = 'INSERT INTO users (username, password) VALUES ($1, $2)';
        const values = [username, hashedPassword];

        await pool.query(query, values);

        res.status(200).json({ message: 'Registration successful' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Registration failed' });
    }
});

module.exports = router;