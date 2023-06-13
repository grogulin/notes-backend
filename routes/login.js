const express = require('express');
const router = express.Router();
const pool = require('../connection');
const bcrypt = require('bcrypt');



router.post('/', async (req, res) => {
    const { username, password } = req.body;
  
    // Validate login credentials
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }
  
    try {

      // Query the database to retrieve the user's record
      const query = 'SELECT * FROM users WHERE username = $1';
      const result = await pool.query(query, [username]);
      const user = result.rows[0];
  
      // Check if user exists
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password.' });
      }
  
      // Compare passwords
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid username or password.' });
      }

      req.session.userId = user.id;
      req.session.username = username;
      var formattedTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

      console.log(formattedTime, ", login/, ", req.session);
      return res.status(200).json({ message: 'Login successful.' });
    } catch (error) {
      console.error('Error logging in:', error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  });
  
module.exports = router;
