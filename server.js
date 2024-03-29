require('dotenv').config();

const express = require('express');
const pool = require('./connection');
const session = require('./session');
const cors = require('cors')
const app = express();

const port = process.env.PORT || 3001;

app.set('trust proxy', true);

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session);


// const allowedOrigins = ['http://localhost:3001',
//   'http://localhost:80',
//   'http://localhost:7001',
//   'http://152.67.72.136'];

// app.use(cors({
//   origin: allowedOrigins,
//   credentials: true
// }));

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://152.67.72.136');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

const allowedOrigins = [
  'http://localhost:3001',
  'http://localhost:80',
  'http://localhost:7001',
  'http://152.67.72.136',
  'http://freedevdom.mooo.com'
];

app.use(cors({
  origin: allowedOrigins,
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

const getUsers = require('./routes/users');
app.use('/users', getUsers);