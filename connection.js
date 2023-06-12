const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST, // Read host from environment variable or use a default value
    port: process.env.DB_PORT, // Read port from environment variable or use a default value
    database: process.env.DB_NAME, // Read database name from environment variable or use a default value
    user: process.env.DB_USER, // Read database username from environment variable or use a default value
    password: process.env.DB_PASSWORD // Read database password from environment variable or use a default value
});

module.exports = pool;