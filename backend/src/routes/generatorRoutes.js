const express = require('express');
const router = express.Router();
const { generateAndSaveContent } = require('../services/contentGeneratorService');

router.post('/generate', async (req, res) => {
    try {
        console.log("Received generation request:", req.body);
        const { title, summary, duration, tags, isCoding } = req.body;

        if (!title || !summary) {
            return res.status(400).json({ error: "Title and Summary are required" });
        }

        const result = await generateAndSaveContent({ title, summary, duration, tags, isCoding });
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
