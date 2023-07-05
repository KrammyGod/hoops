const express = require('express')
require('dotenv').config();

const app = express();
const port = 5000;

app.use(express.json())


app.use('/', async () => {
    return "hello";
})

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
  })