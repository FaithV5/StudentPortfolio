const express = require("express");
const path = require("path");

const app = express();

// Serve all static files from the current directory
app.use(express.static(__dirname));

// Route for homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
