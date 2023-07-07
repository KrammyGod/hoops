import dotenv from "dotenv";
import express from "express";

import { searchPlayerByName } from "../apis/playerteam.js"
import { createBookmark, getBookmarks, deleteBookmark } from "../apis/bookmarks.js";
import { searchPlayerByName } from "../apis/playerteam.js";
import cors from "cors";
dotenv.config();
const PORT = 5000;
const app = express();
app.use(express.json());

app.use(cors());

// bookmarks api route
app.post("/bookmarks", createBookmark)
app.get("/bookmarks", getBookmarks) 
app.delete("/bookmarks", deleteBookmark)

/* USED FOR PUBLIC FACING THINGS (like player id but NOT user id)
app.get("/player/:id", searchPlayerByName)
*/
app.get("/player", searchPlayerByName)
app.use("/", async (req, res) => 
    res.json({ messages: "ERROR. ROUTE NOT FOUND." })
)

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
});