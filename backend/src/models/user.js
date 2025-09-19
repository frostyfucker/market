const db = require('../db');
const bcrypt = require('bcrypt');

const User = {
  async create(username, password) {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const query = {
      text: 'INSERT INTO users(username, password_hash) VALUES($1, $2) RETURNING id, username',
      values: [username, passwordHash],
    };
    const { rows } = await db.query(query.text, query.values);
    return rows[0];
  },

  async findByUsername(username) {
    const query = {
      text: 'SELECT * FROM users WHERE username = $1',
      values: [username],
    };
    const { rows } = await db.query(query.text, query.values);
    return rows[0];
  },

  async comparePassword(plaintextPassword, hash) {
    return await bcrypt.compare(plaintextPassword, hash);
  }
};

module.exports = User;
