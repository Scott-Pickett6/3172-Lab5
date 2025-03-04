import express from "express";
import serverless from "serverless-http";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const api = express();
const router = express.Router();

router.get("/recommendations", async (req, res) => {
    const artist = req.query.artist;

    if (!artist) return res.status(400).json({
        error: "Artist is required"
    });
    try {
        const response = await fetch(
            `https://musicbrainz.org/ws/2/artist/?query=artist:${encodeURIComponent(artist)}&fmt=json`,
            {
                headers: {
                    Accept: "application/json"
                }
            }
        );
        const data = await response.json();
        console.log("data: " + data);
    } 
    catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});
api.use("/api/", router);
export const handler = serverless(api);