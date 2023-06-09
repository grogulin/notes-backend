const express = require('express');
const router = express.Router();

// Function to retrieve session data from PostgreSQL
async function getSessionData(sessionId) {
    const query = 'SELECT sess FROM sessions WHERE sid = $1';
    const values = [sessionId];

    try {
        const result = await pool.query(query, values);
        if (result.rows.length > 0) {
        const sessionData = result.rows[0].sess;
        // Parse and extract the session data as needed
        return sessionData;
        }
        // Session data not found for the given session ID
        return null;
    } catch (error) {
        // Handle any errors that occur during the query
        console.error('Error retrieving session data:', error);
        throw error;
    }
};

// Example route
router.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Login route
router.post('/login', (req, res, next) => {
  req.session.test1 = 'Value 1';
  console.log("Session log after adding test1 parameter inside POST request to login/", req.session);
  return res.status(200).json({ message: 'Login successful.' });
});

// Notes route
router.get('/notes', async (req, res) => {
  console.log("Session log in GET request to notes/", req.session);
//   const sessionId = req.cookies.sessionId;
    console.log("Headers: ", req.headers)

  // Retrieve the session data from PostgreSQL
  const sessionData = await getSessionData(sessionId);

  if (sessionData) {
    // Use the session data as needed
    console.log('Session data:', sessionData);
    res.send('Notes page');
  } else {
    // Session data not found, handle accordingly
    res.status(401).send('Unauthorized');
  }
//   res.send('Notes page');
    return res.status(200).json({ message: 'Login successful.' });
});

// Export the router
module.exports = router;