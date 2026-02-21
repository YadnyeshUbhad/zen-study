const axios = require('axios');

async function testHealth() {
    try {
        console.log("Testing Health API...");
        const response = await axios.get('http://localhost:5000/health');
        console.log("Response:", response.data);
    } catch (error) {
        console.error("Error:", error.message);
    }
}

testHealth();
