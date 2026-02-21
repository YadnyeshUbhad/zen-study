/**
 * Extracts the playlist ID from a YouTube playlist URL.
 *
 * Supported formats:
 *  - https://www.youtube.com/playlist?list=PLxxxxxx
 *  - https://youtube.com/playlist?list=PLxxxxxx
 *  - https://www.youtube.com/watch?v=abc&list=PLxxxxxx
 *  - URLs with additional query parameters
 *
 * @param {string} url - The YouTube URL containing a playlist.
 * @returns {string|null} The playlist ID, or null if not found.
 */
function extractPlaylistId(url) {
    if (!url || typeof url !== 'string') {
        return null;
    }

    try {
        const parsed = new URL(url);
        const listParam = parsed.searchParams.get('list');
        return listParam || null;
    } catch {
        // Not a valid URL — try a regex fallback
        const match = url.match(/[?&]list=([a-zA-Z0-9_-]+)/);
        return match ? match[1] : null;
    }
}

module.exports = { extractPlaylistId };
