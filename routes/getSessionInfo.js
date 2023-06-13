const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  var formattedTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  console.log(formattedTime, "session/ ", req.session);
  if (req.session.username) {
    res.status(200).json({ username: req.session.username });
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;