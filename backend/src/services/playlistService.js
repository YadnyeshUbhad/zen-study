const supabase = require('../config/supabaseClient');
const { getPlaylistDetails, fetchPlaylistMetadata } = require('./youtubeService');

/**
 * Converts ISO 8601 duration to seconds
 */
function parseDuration(duration) {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return 0;
    const hours = (parseInt(match[1]) || 0);
    const minutes = (parseInt(match[2]) || 0);
    const seconds = (parseInt(match[3]) || 0);
    return hours * 3600 + minutes * 60 + seconds;
}

const importPlaylist = async (playlistId, userId) => {
    try {
        console.log(`Importing playlist: ${playlistId} for user: ${userId}`);

        // 1. Fetch Playlist Metadata
        const metadata = await fetchPlaylistMetadata(playlistId);

        // 2. Fetch Videos
        const { videos } = await getPlaylistDetails(playlistId);

        // 3. Insert or Update Playlist in DB
        const { data: playlist, error: playlistError } = await supabase
            .from('playlists')
            .upsert({
                youtube_id: playlistId,
                title: metadata.title,
                description: metadata.description,
                thumbnail_url: metadata.thumbnail
            }, { onConflict: 'youtube_id' })
            .select()
            .single();

        if (playlistError) throw playlistError;

        console.log(`Playlist saved: ${playlist.id}`);

        // 4. Process Videos
        const playlistVideosToInsert = [];

        for (const video of videos) {
            // Insert Video if not exists
            const durationSec = parseDuration(video.duration);

            // Upsert Video
            const { data: savedVideo, error: videoError } = await supabase
                .from('videos')
                .upsert({
                    youtube_id: video.id,
                    title: video.title,
                    summary: "", // Summary will be generated later
                    duration: durationSec,
                    tags: [], // Tags to be filled later or extracted
                    is_coding: false // Default to false, can be updated later
                }, { onConflict: 'youtube_id' })
                .select()
                .single();

            if (videoError) {
                console.error(`Error saving video ${video.id}:`, videoError);
                continue;
            }

            // Link to Playlist
            const { error: linkError } = await supabase
                .from('playlist_videos')
                .upsert({
                    playlist_id: playlist.id,
                    video_id: savedVideo.id,
                    "order": video.position
                }, { onConflict: 'playlist_id, video_id' });

            if (linkError) {
                console.error(`Error linking video ${video.id} to playlist:`, linkError);
            }
        }

        return { success: true, playlistId: playlist.id, videoCount: videos.length };

    } catch (error) {
        console.error("Error importing playlist:", error);
        throw error;
    }
};

module.exports = { importPlaylist, parseDuration };
