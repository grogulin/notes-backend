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
};

const sessionInstance = session(sessionConfig);

module.exports = sessionInstance;
