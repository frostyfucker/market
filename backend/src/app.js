const express = require('express');
const authRoutes = require('./api/auth');
const inventoryRoutes = require('./api/inventory');
const aiRoutes = require('./api/ai');

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/ai', aiRoutes);

// Basic error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = app;
