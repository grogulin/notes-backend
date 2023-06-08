const express = require('express');
const pool = require('./connection');
const session = require('express-session');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'SeCRREETKeyy__',
    resave: false,
    saveUninitialized: false
}));



// Example route
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


  
// // Test the database connection
// pool.query('SELECT NOW()', (err, result) => {
// if (err) {
//     console.error('Error connecting to the database:', err);
// } else {
//     console.log('Connected to the database at', result.rows[0].now);
// }
// });

const registrationRoute = require('./routes/registration');
app.use('/registration', registrationRoute);

const loginRoute = require('./routes/login')
app.use('/login', loginRoute);

const notesRoute = require('./routes/notes');
app.use('/notes', notesRoute);

const logoutRoute = require('./routes/logout');
app.use('/logout', logoutRoute);