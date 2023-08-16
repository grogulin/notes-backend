const express = require('express');
const router = express.Router();
const pool = require('../connection');
const bcrypt = require('bcrypt');


router.get('/', async (req, res) => {
    try {
      // Execute a SQL query to select notes for the given user
      const query = "SELECT username, id FROM users ORDER BY id DESC";
      const result = await pool.query(query);
  
      // Retrieve the notes from the query response
      const usernames = result.rows;
  
      // Send the notes as a JSON response
      res.json(usernames);
    } catch (error) {
      console.error('Error retrieving users:', error);
      res.status(500).json({ error: 'An error occurred while retrieving users' });
    }
});

router.get('/:userId/notes', async (req, res) => {
  const userId = req.params.userId;

  try {
    // Execute a SQL query to select notes for the given user
    const query = 'SELECT note_text, note_id, created_at FROM notes WHERE user_id = $1 ORDER BY note_id DESC';
    const values = [userId];
    const result = await pool.query(query, values);

    // Retrieve the notes from the query response
    const notes = result.rows;

    // Send the notes as a JSON response
    res.json(notes);
  } catch (error) {
    console.error(`Error retrieving notes for userId:${userId}`, error);
    res.status(500).json({ error: 'An error occurred while retrieving notes' });
  }
});


module.exports = router;
