const axios = require('axios');
const config = require('../config/env');

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

/**
 * Fetches metadata for a specific playlist (Title, Description, Thumbnail).
 *
 * @param {string} playlistId
 * @returns {Promise<{title: string, description: string, thumbnail: string}>}
 */
async function fetchPlaylistMetadata(playlistId) {
    const { data } = await axios.get(`${YOUTUBE_API_BASE}/playlists`, {
        params: {
            part: 'snippet',
            id: playlistId,
            key: config.youtubeApiKey,
        },
        family: 4, // Force IPv4
    });

    if (!data.items || data.items.length === 0) {
        throw new Error('Playlist not found');
    }

    const snippet = data.items[0].snippet;
    return {
        title: snippet.title,
        description: snippet.description,
        thumbnail:
            snippet.thumbnails?.medium?.url ||
            snippet.thumbnails?.default?.url ||
            '',
    };
}

/**
 * Fetches all videos from a playlist, handling pagination.
 *
 * @param {string} playlistId
 * @returns {Promise<Array<{id: string, title: string, thumbnail: string, position: number}>>}
 */
async function fetchPlaylistItems(playlistId) {
    const videos = [];
    let nextPageToken = null;

    do {
        const params = {
            part: 'snippet,contentDetails',
            maxResults: 50,
            playlistId,
            key: config.youtubeApiKey,
        };

        if (nextPageToken) {
            params.pageToken = nextPageToken;
        }

        const { data } = await axios.get(`${YOUTUBE_API_BASE}/playlistItems`, {
            params,
            family: 4, // Force IPv4
        });

        for (const item of data.items) {
            videos.push({
                id: item.contentDetails.videoId,
                title: item.snippet.title,
                thumbnail:
                    item.snippet.thumbnails?.medium?.url ||
                    item.snippet.thumbnails?.default?.url ||
                    '',
                position: item.snippet.position + 1, // 1-indexed for the frontend
            });
        }

        nextPageToken = data.nextPageToken || null;
    } while (nextPageToken);

    return videos;
}

/**
 * Fetches durations for a list of video IDs.
 * Batches requests in groups of 50 (YouTube API limit).
 *
 * @param {string[]} videoIds
 * @returns {Promise<Map<string, string>>} Map of videoId → ISO 8601 duration
 */
async function fetchVideoDurations(videoIds) {
    const durationMap = new Map();

    // Process in batches of 50
    for (let i = 0; i < videoIds.length; i += 50) {
        const batch = videoIds.slice(i, i + 50);

        const { data } = await axios.get(`${YOUTUBE_API_BASE}/videos`, {
            params: {
                part: 'contentDetails',
                id: batch.join(','),
                key: config.youtubeApiKey,
            },
            family: 4, // Force IPv4
        });

        for (const item of data.items) {
            durationMap.set(item.id, item.contentDetails.duration);
        }
    }

    return durationMap;
}

/**
 * Main orchestrator: fetches playlist items and their durations.
 *
 * @param {string} playlistId
 * @returns {Promise<{playlistId: string, videos: Array}>}
 */
async function getPlaylistDetails(playlistId) {
    // Step 1: Fetch all playlist items
    const videos = await fetchPlaylistItems(playlistId);

    if (videos.length === 0) {
        return { playlistId, videos: [] };
    }

    // Step 2: Fetch durations for all videos
    const videoIds = videos.map((v) => v.id);
    const durationMap = await fetchVideoDurations(videoIds);

    // Step 3: Merge durations into video objects
    const enrichedVideos = videos.map((video) => ({
        ...video,
        duration: durationMap.get(video.id) || 'PT0S',
    }));

    return { playlistId, videos: enrichedVideos };
}

module.exports = { getPlaylistDetails, fetchPlaylistMetadata };
