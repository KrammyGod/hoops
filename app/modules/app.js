import dotenv from "dotenv";
import express from "express";
import { searchPlayerByName } from "../apis/playerteam.js";
import { getPlayerStats, getTeamStats, getAllPlayerStats, getAllTeamStats } from "../apis/stats.js";
import { getLeaderboards } from "../apis/leaderboards.js";
import cors from "cors";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000;

app.get('/playerstats/:pid', async (req, res) => {
    const stats = await getPlayerStats(req.params.pid)
    res.send(stats);
});

app.get('/teamstats/:abbrev', async (req, res) => {
    const stats = await getTeamStats(req.params.abbrev)
    res.send(stats);
});

app.get('/allplayerstats', async (req, res) => {
    const stats = await getAllPlayerStats()
    res.send(stats);
});

app.get('/allteamstats', async (req, res) => {
    const stats = await getAllTeamStats()
    res.send(stats);
});

app.get("/leaderboards/:type", getLeaderboards);
/* USED FOR PUBLIC FACING THINGS (like player id but NOT user id)
app.get("/player/:id", searchPlayerByName)
*/
app.get("/player", searchPlayerByName)
app.use("/", async (req, res) => 
    res.send("success")
)

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
});