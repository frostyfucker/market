const { Pool } = require('pg');

// TODO: Replace with environment variables
const pool = new Pool({
  user: 'your_db_user',
  host: 'localhost',
  database: 'clothing_scanner',
  password: 'your_db_password',
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
