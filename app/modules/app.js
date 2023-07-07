import dotenv from "dotenv";
import express from "express";
import { searchPlayerByName } from "../apis/playerteam.js";
import cors from "cors";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000;

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