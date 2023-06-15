const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const pool = require('./connection');

const sessionConfig = {
  secret: 'YourSecretKey',
  resave: false,
  saveUninitialized: false,
  store: new pgSession({
    pool: pool, // Provide your PostgreSQL pool instance
    tableName: 'sessions', // Specify the table name to store sessions
  }),
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // Set the cookie expiration time (7 days in this example)
    secure: false, // Set it to `true` if using HTTPS
    httpOnly: true, // The cookie cannot be accessed via JavaScript
    domain: '.freedevdom.mooo.com'
  }
};

const sessionInstance = session(sessionConfig);

module.exports = sessionInstance;
