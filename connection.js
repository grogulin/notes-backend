const { Pool } = require('pg');

const pool = new Pool({
    host: '152.67.72.136', // Replace with the appropriate host if necessary
    port: 5432, // Replace with the appropriate port if necessary
    database: 'notesapp_test', // Replace with your database name
    user: 'user001_dev', // Replace with your database username
    password: 'QDLVy3aD' // Replace with your database password
});



module.exports = pool;