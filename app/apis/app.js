const express = require('express')
const DB = require('../modules/database')
require('dotenv').config();

const app = express();
const port = 5000;

app.use(express.json())

app.use('/', async (req, res) => {
    res.send(await DB.login('admin', 'admin'));
})

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
  })