import dotenv from "dotenv";
import express from "express";
import cors from 'cors';
import * as DB from "../modules/database.js";
dotenv.config();

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

app.get('/playerstats/:pid', async (req, res) => {
    const stats = await DB.getPlayerStats(req.params.pid)
    res.send(stats)
});

app.get('/teamstats/:abbrev', async (req, res) => {
    const stats = await DB.getTeamStats(req.params.abbrev)
    res.send(stats)
});

app.get('/allplayerstats', async (req, res) => {
    const stats = await DB.getAllPlayerStats()
    res.send(stats)
});

app.get('/allteamstats', async (req, res) => {
    const stats = await DB.getAllTeamStats()
    res.send(stats)
});

app.use('/', async (req, res) => {
    const loggedIn = await DB.login('placeholder email', 'placeholder pass');
    res.send(loggedIn);
});

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
});