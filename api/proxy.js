// /api/proxy.js

export default async function handler(req, res) {
    const { url } = req.query; // URL থেকে ভিডিও লোড করার জন্য

    // URL যাচাই করা
    if (!url || typeof url !== 'string' || !isValidUrl(url)) {
        return res.status(400).json({ error: 'Invalid or missing url parameter' });
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.buffer(); // অথবা response.text() প্রয়োজন অনুসারে

        res.setHeader('Content-Type', response.headers.get('content-type'));
        res.setHeader('Access-Control-Allow-Origin', '*'); // CORS header
        res.send(data);
    } catch (error) {
        console.error("Error fetching video: ", error);
        res.status(500).json({ error: 'Failed to fetch video', details: error.message });
    }
}

// URL যাচাই করার জন্য ফাংশন
function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
}
