const express = require('express');
const fetch = require('node-fetch');
const app = express();

// Endpoint to handle GET requests
app.get('/redirect', async (req, res) => {
    try {
        const youtubeUrl = req.query.url;
        const apiUrl = `https://vivekplay.vercel.app/api/info?url=${encodeURIComponent(youtubeUrl)}`;

        // Make a fetch request to get JSON data from vivekplay API
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        // Find the format with format_id '140'
        const audioFormat = data.find(format => format.format_id === '140');
        if (!audioFormat) {
            throw new Error('Format 140 not found in the response.');
        }

        const playbackUrl = audioFormat.url;
        console.log("Playback URL:", playbackUrl);

        // Redirect to the 140 format URL
        res.redirect(playbackUrl);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Error fetching or redirecting.');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
