const { extractPlaylistId } = require('../utils/extractId');
const { getPlaylistDetails } = require('../services/youtubeService');

/**
 * POST /api/playlist
 * Accepts { url: "..." } and returns structured playlist data.
 */
async function handlePlaylistRequest(req, res) {
    try {
        const { url } = req.body;

        // --- Validation ---
        if (!url) {
            return res.status(400).json({ error: 'Playlist URL is required.' });
        }

        const playlistId = extractPlaylistId(url);

        if (!playlistId) {
            return res.status(400).json({ error: 'Invalid playlist URL. Could not extract playlist ID.' });
        }

        // --- Fetch data from YouTube ---
        const result = await getPlaylistDetails(playlistId);

        if (result.videos.length === 0) {
            return res.status(404).json({ error: 'No videos found in this playlist.' });
        }

        return res.json(result);
    } catch (err) {
        console.error('Playlist fetch error:', err.message);

        // Handle YouTube API-specific errors
        if (err.response) {
            const status = err.response.status;
            const ytError = err.response.data?.error;

            if (status === 403) {
                return res.status(403).json({ error: 'YouTube API quota exceeded or access denied.' });
            }
            if (status === 404) {
                return res.status(404).json({ error: 'Playlist not found. It may be private or deleted.' });
            }

            return res.status(status).json({
                error: ytError?.message || 'Failed to fetch playlist from YouTube.',
            });
        }

        return res.status(500).json({ error: 'Failed to fetch playlist. Please try again later.' });
    }
}

module.exports = { handlePlaylistRequest };
