require('dotenv').config()
const { dbConfig } = require('./config/db.config')
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT
dbConfig();


app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
    res.send('E-commerce API is running')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})