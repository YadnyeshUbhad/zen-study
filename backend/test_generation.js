const axios = require('axios');

async function testGeneration() {
    try {
        console.log("Testing Content Generation API...");

        const response = await axios.post('http://localhost:5000/api/generate', {
            title: "Introduction to Binary Search",
            summary: "Binary search is an efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing in half the portion of the list that could contain the item, until you've narrowed down the possible locations to just one. Time complexity is O(log n).",
            duration: 600,
            tags: ["algorithms", "binary search", "computer science"],
            isCoding: true
        });

        console.log("Response:", JSON.stringify(response.data, null, 2));

        if (response.data.success) {
            console.log("✅ Content generated and saved successfully!");
            console.log(`Video ID: ${response.data.videoId}`);
        } else {
            console.error("❌ Failed to generate content.");
        }

    } catch (error) {
        if (error.response) {
            console.error("Error Response:", error.response.data);
        } else {
            console.error("Error:", error.message);
        }
    }
}

testGeneration();
