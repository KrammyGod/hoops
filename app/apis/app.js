import dotenv from "dotenv";
import express from "express";
import cors from 'cors';
import * as DB from "../modules/database.js";
dotenv.config();

const app = express();
const PORT = 5002;

app.use(express.json());
app.use(cors());

app.get('/playerstats/:pid', async (req, res) => {
    const stats = await DB.getPlayerStats(req.params.pid);
    res.send(stats);
});

app.use('/', async (req, res) => {
    const loggedIn = await DB.login('placeholder email', 'placeholder pass');
    res.send(loggedIn);
});

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
});