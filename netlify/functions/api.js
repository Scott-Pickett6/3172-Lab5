import express from "express";
import serverless from "serverless-http";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const api = express();
const router = express.Router();
const API_KEY = process.env.LAST_FM_API_KEY;

router.get("/recommendations", async (req, res) => {
    const artist = req.query.artist;
    console.log("artist: " + artist);

    if (!artist) return res.status(400).json({
        error: "Artist is required"
    });
    try {
        // 6a75091e2fe639ad539a21d8ff485c57
        // I could not get the API key to work from .env file
        const response = await fetch(
            `https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${artist}&api_key=6a75091e2fe639ad539a21d8ff485c57&format=json`,
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