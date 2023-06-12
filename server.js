require('dotenv').config();

const express = require('express');
const pool = require('./connection');
// const session = require('express-session'); 
const session = require('./session');
const cors = require('cors')
const app = express();

const port = process.env.PORT || '3005';
console.log("PORT env var: ,", process.env.PORT);

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session);
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));


// Example route
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const registrationRoute = require('./routes/registration');
app.use('/registration', registrationRoute);

const loginRoute = require('./routes/login')
app.use('/login', loginRoute);
// app.use('/', require('./routes/testRoute'));

const notesRoute = require('./routes/notes');
app.use('/notes', notesRoute);

const logoutRoute = require('./routes/logout');
app.use('/logout', logoutRoute);

const getSessionInfo = require('./routes/getSessionInfo');
app.use('/session', getSessionInfo);
