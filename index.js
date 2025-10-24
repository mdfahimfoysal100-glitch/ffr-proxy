import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/proxy", async (req, res) => {
  try {
    const targetUrl = req.query.url;
    if (!targetUrl) return res.status(400).send("Missing URL");

    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125 Safari/537.36",
      },
    });

    const data = await response.text();
    res.send(data);
  } catch (err) {
    res.status(500).send("Proxy Error: " + err.message);
  }
});

app.listen(process.env.PORT || 10000, () =>
  console.log("✅ FFR Proxy Running")
);
