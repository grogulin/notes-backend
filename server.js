const express = require('express');
const pool = require('./connection');
// const session = require('express-session'); 
const session = require('./session');
const cors = require('cors')
const app = express();

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
app.listen(3000, () => {
    console.log('Server is running on port 3000');
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
