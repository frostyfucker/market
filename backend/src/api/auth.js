const express = require('express');
const AuthService = require('../services/authService');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
    const user = await AuthService.register(username, password);
    res.status(201).json({ message: 'User created successfully', userId: user.id });
  } catch (error) {
    // Check for specific error from service
    if (error.message.includes('already exists')) {
        return res.status(409).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
    const { accessToken, refreshToken } = await AuthService.login(username, password);
    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    // Distinguish between "not found" and other errors
    if (error.message === 'Invalid credentials') {
      return res.status(401).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
