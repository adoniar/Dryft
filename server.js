const express = require('express');
const path = require('path');
const app = express();

// Serve static files (like images, CSS, JS) from the root
app.use(express.static(__dirname));

// Route to serve index.html directly from the root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));