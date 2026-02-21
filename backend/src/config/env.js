const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const config = {
    port: process.env.PORT || 5000,
    youtubeApiKey: process.env.YOUTUBE_API_KEY,
    corsOrigin: process.env.CORS_ORIGIN || '*',
};

if (!config.youtubeApiKey) {
    console.error('❌ YOUTUBE_API_KEY is missing. Set it in server/.env');
    process.exit(1);
}

module.exports = config;
