const express = require('express');
const router = express.Router();
const pool = require('../connection');
const bcrypt = require('bcrypt');

router.post('/', (req, res) => {
    // Clear the session and destroy the session cookie
    req.session.destroy((err) => {
    if (err) {
        console.error('Error destroying session:', err);
        return res.status(500).json({ message: 'Server error' });
    }
    // Redirect or respond with a success message
    res.status(200).json({ message: 'Logout successful' });
    });
});

module.exports = router;