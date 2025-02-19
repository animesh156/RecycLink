const express = require("express");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Waste analysis endpoint
router.post("/analyze", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No image uploaded" });

    // Prepare image file for Flask API
    const formData = new FormData();
    formData.append("image", fs.createReadStream(req.file.path));

    // Send image to Flask AI server
    const aiResponse = await axios.post("http://127.0.0.1:5001/analyze", formData, {
      headers: { ...formData.getHeaders() },
    });

    // Extract suggestion from AI response
    const suggestion = aiResponse.data.suggestion;

    // Remove the uploaded file after successful processing
    fs.unlink(req.file.path, (err) => {
      if (err) console.error("❌ Error deleting file:", err);
    });

    res.json({ suggestion });
  } catch (error) {
    console.error("❌ Error analyzing image:", error);

    // Ensure file is deleted even if there's an error
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("❌ Error deleting file after failure:", err);
      });
    }

    res.status(500).json({ error: "Error processing image" });
  }
});

module.exports = router;
