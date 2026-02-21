const express = require('express');
const cors = require('cors');
const playlistRoutes = require('./routes/playlistRoutes');
const generatorRoutes = require('./routes/generatorRoutes');

const app = express();

// --------------- Middleware ---------------
app.use((req, res, next) => {
    console.log(`[DEBUG] Incoming Request: ${req.method} ${req.originalUrl}`);
    next();
});

app.use(cors());
app.use(express.json());

// --------------- Routes ---------------
app.use('/api', playlistRoutes);
console.log("Mounting generator routes...");
app.use('/api', generatorRoutes);

// --------------- Health Check ---------------
app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// --------------- Global Error Handler ---------------
app.use((err, _req, res, _next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error.' });
});

module.exports = app;
