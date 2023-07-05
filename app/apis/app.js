import express from "express"
import dotenv from "dotenv"
import { login } from "../modules/database.js"
dotenv.config();

const app = express();
const port = 5000;

app.use(express.json())

app.use('/', async (req, res) => {
    res.send(await login(process.env.PGUSER, process.env.PGPASSWORD));
})

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
  })