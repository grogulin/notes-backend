const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  if (req.session.username) {
    res.status(200).json({ username: req.session.username });
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;