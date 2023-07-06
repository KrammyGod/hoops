import dotenv from "dotenv";
import express from "express";
import { searchPlayerByName } from "../apis/playerteam.js"
dotenv.config();

const app = express();
const PORT = 5000;

app.use(express.json());

app.get("/player/:id", searchPlayerByName)
app.use("/", async (req, res) => 
    res.send("success")
)

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
});