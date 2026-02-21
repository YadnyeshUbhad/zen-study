const express = require('express');
const { handlePlaylistRequest } = require('../controllers/playlistController');

const router = express.Router();

router.post('/playlist', handlePlaylistRequest);

module.exports = router;
