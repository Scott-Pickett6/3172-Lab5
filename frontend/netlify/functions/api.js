import express from "express";
import serverless from "serverless-http";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const api = express();
const router = express.Router();
const LAST_FM_API_KEY = process.env.LAST_FM_API_KEY;

router.get("/recommendations", async (req, res) => {
    const artist = req.query.artist;
    console.log("artist: " + artist);

    if (!artist) return res.status(400).json({
        error: "Artist is required"
    });
    try {
        const response = await fetch(
            `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artist}&api_key=${LAST_FM_API_KEY}&format=json`,
            {
                headers: {
                    Accept: "application/json"
                }
            }
        );
        const data = await response.json();
        console.log("data: " + data);
        res.json(data);
    } 
    catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});
api.use("/api/", router);
export const handler = serverless(api);