import dotenv from "dotenv";
import express from "express";
import * as DB from "../modules/database.js";
dotenv.config();

const app = express();
const PORT = 5000;

app.use(express.json());

app.use('/', async (req, res) => {
    const loggedIn = await DB.login('placeholder email', 'placeholder pass');
    res.send(loggedIn);
});

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
});