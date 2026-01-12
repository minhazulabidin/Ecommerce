require('dotenv').config()
const { dbConfig } = require('./config/db.config')
const express = require('express')
const cors = require('cors')
const router = require('./route/api')
const { globalErrorHandiling } = require('./utilities/globalErrorHandiling')
const app = express()
const port = process.env.PORT
dbConfig();


app.use(express.json())
app.use(cors())


//localhost:8080/api/v1/
app.use(process.env.BASE_ROUTE, router)
app.use(globalErrorHandiling)


app.get('/', (req, res) => {
    res.send('E-commerce API is running')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})