const express = require('express');
const app = express();

// Endpoint to handle GET requests
app.get('/play', (req, res) => {
    const { url } = req.query;

    // Construct the API endpoint URL
    const apiUrl = `https://vivekplay.vercel.app/api/info?url=${url}`;

    // Make a fetch request to the API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Find the format with format_id '140'
            const audioFormat = data.formats.find(format => format.format_id === '140');
            if (audioFormat) {
                const playbackUrl = audioFormat.url;
                // Redirect to the 140 format URL
                res.redirect(playbackUrl);
            } else {
                console.error("Format 140 not found in the response.");
                res.status(404).send('Format 140 not available.');
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            res.status(500).send('Error fetching data.');
        });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
