const User = require('../models/user');
const jwt = require('jsonwebtoken');

// TODO: Move to environment variables
const JWT_SECRET = 'your-super-secret-key';
const REFRESH_TOKEN_SECRET = 'your-super-secret-refresh-key';

const AuthService = {
  async register(username, password) {
    try {
      const existingUser = await User.findByUsername(username);
      if (existingUser) {
        throw new Error('Username already exists');
      }
      const newUser = await User.create(username, password);
      return newUser;
    } catch (error) {
      throw new Error(`Registration failed: ${error.message}`);
    }
  },

  async login(username, password) {
    try {
      const user = await User.findByUsername(username);
      if (!user) {
        throw new Error('Invalid credentials');
      }

      const isPasswordValid = await User.comparePassword(password, user.password_hash);
      if (!isPasswordValid) {
        throw new Error('Invalid credentials');
      }

      const accessToken = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, { expiresIn: '15m' });
      const refreshToken = jwt.sign({ userId: user.id, username: user.username }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

      // In a real app, you'd save the hashed refresh token to the DB
      // await User.saveRefreshToken(user.id, refreshToken);

      return { accessToken, refreshToken };
    } catch (error) {
      throw new Error(`Login failed: ${error.message}`);
    }
  }
};

module.exports = AuthService;
