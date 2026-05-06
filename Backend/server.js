const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate", async (req, res) => {
  const userPrompt = req.body.prompt;
  console.log("📥 Prompt received:", userPrompt);

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              { text: userPrompt }
            ]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    console.log("✅ Gemini response success");
    res.json(response.data);

  } catch (err) {
    console.error("❌ Gemini API error:");

    if (err.response) {
      console.error("Status:", err.response.status);
      console.error("Data:", JSON.stringify(err.response.data, null, 2));
      res.status(500).json({
        error: "Gemini API error",
        details: err.response.data
      });
    } else {
      console.error("Message:", err.message);
      res.status(500).json({
        error: "Internal server error",
        message: err.message
      });
    }
  }
});

app.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});