const express = require('express');
const router = express.Router();
const pool = require('../connection');
const bcrypt = require('bcrypt');

function requireAuth(req, res, next) {
  console.log("RequireAuth, ", req.session)
  // console.log("notes/", req.session);
    if (!req.session.userId) {
        return res.status(401).json({ message: 'Unauthorized.' });
    }
    
    next();
}

async function getUserLogin(userId) {
    try {
        // Query the database to retrieve the user's login based on userId
        const query = 'SELECT username FROM users WHERE id = $1';
        const result = await pool.query(query, [userId]);
        // console.log(`Number of returned rows for ${userId} is ${result.rowCount}`)
        const user = result.rows[0];

        // Return the user login
        return user ? user.username : null;
    } catch (error) {
        console.error('Error retrieving user login:', error);
        throw error;
    }
}  

router.get('/', requireAuth, async (req, res) => {
    // Connect to the PostgreSQL database
    const userId = req.session.userId;
  
    try {
      // Execute a SQL query to select notes for the given user
      const query = 'SELECT * FROM notes WHERE user_id = $1 order by created_at desc';
      const values = [userId];
      const result = await pool.query(query, values);
  
      // Retrieve the notes from the query response
      const notes = result.rows;
  
      // Send the notes as a JSON response
      res.json(notes);
    } catch (error) {
      console.error('Error retrieving notes:', error);
      res.status(500).json({ error: 'An error occurred while retrieving notes' });
    }
});

router.get('/:noteId', requireAuth, async (req, res) => {
    const userId = req.session.userId;
    const noteId = req.params.noteId;
  
    // Connect to the PostgreSQL database
  
    try {
      // Execute a SQL query to select notes for the given user
      const query = 'SELECT * FROM notes WHERE user_id = $1 and note_id = $2';
      const values = [userId, noteId];
      const result = await pool.query(query, values);
  
      // Retrieve the notes from the query response
      const notes = result.rows;
  
      // Send the notes as a JSON response
      res.json(notes);
    } catch (error) {
      console.error('Error retrieving notes:', error);
      res.status(500).json({ error: 'An error occurred while retrieving notes' });
    }
});

router.delete('/:noteId', requireAuth, async (req, res) => {
    const noteId = req.params.noteId;
  
    // Connect to the PostgreSQL database
  
    try {
      // Execute a SQL query to delete the note with the provided noteId
      const query = 'DELETE FROM notes WHERE note_id = $1';
      const values = [noteId];
      const result = await pool.query(query, values);
  
      // Check the number of affected rows
      if (result.rowCount === 0) {
        // No rows deleted, note not found
        res.status(404).json({ error: 'Note not found' });
      } else {
        // Note successfully deleted
        res.json({ message: 'Note deleted successfully' });
      }
    } catch (error) {
      console.error('Error deleting note:', error);
      res.status(500).json({ error: 'An error occurred while deleting the note' });
    }
});

router.put('/:noteId', requireAuth, async (req, res) => {
    const noteId = req.params.noteId;
    const updatedNote = req.body;
  
    // Connect to the PostgreSQL database
  
    try {
      // Execute a SQL query to update the note with the provided noteId
      const query = 'UPDATE notes SET note_text = $1 WHERE note_id = $2';
      const values = [updatedNote.noteText, noteId];
      const result = await pool.query(query, values);
  
      // Check the number of affected rows
      if (result.rowCount === 0) {
        // No rows updated, note not found
        res.status(404).json({ error: 'Note not found' });
      } else {
        // Note successfully updated
        res.json({ message: 'Note updated successfully' });
      }
    } catch (error) {
      console.error('Error updating note:', error);
      res.status(500).json({ error: 'An error occurred while updating the note' });
    }
});

router.post('/new', requireAuth, async (req, res) => {
    const { noteText } = req.body;
    const userId = req.session.userId;
  
    // Connect to the PostgreSQL database
  
    try {
      // Execute a SQL query to insert a new note
      const query = 'INSERT INTO notes (user_id, note_text) VALUES ($1, $2)';
      const values = [userId, noteText];
      const result = await pool.query(query, values);
  
      // Check the result of the query
      if (result.rowCount === 1) {
        // Note successfully created
        res.status(201).json({ message: 'Note created successfully' })
        // res.json({ message: 'Note created successfully' });
      } else {
        // Failed to create note
        res.status(500).json({ error: 'Failed to create note' });
      }
    } catch (error) {
      console.error('Error creating note:', error);
      res.status(500).json({ error: 'An error occurred while creating the note' });
    }
});

module.exports = router;
