const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // console.log(req.session);
  // if (req.session.username) {
  //   res.status(200).json({ username: req.session.username });
  // } else {
  //   res.sendStatus(401);
  // }

  const sessionId = req.cookies.sessionId; // Retrieve the session ID from cookies
  console.log("Session ID:", sessionId);

  // Query the sessions table to fetch the session data
  // pool.query('SELECT sess FROM sessions WHERE sid = $1', [sessionId], (error, result) => {
  //   if (error) {
  //     console.error('Error retrieving session:', error);
  //     return res.status(500).json({ error: 'Internal server error' });
  //   }

  //   if (result.rows.length === 0) {
  //     console.log('Session not found');
  //     return res.status(401).json({ error: 'Unauthorized' });
  //   }

  //   const sessionData = result.rows[0].sess; // Extract the session data from the result
  //   const session = JSON.parse(sessionData); // Deserialize the session data

  //   req.session = session; // Assign the session data to req.session

  //   // Proceed with further processing or respond with the session data
  //   return res.status(200).json({ session });
  // });
});

module.exports = router;