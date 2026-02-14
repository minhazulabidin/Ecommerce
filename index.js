require('dotenv').config();
const db = require('./config/db.config');
const session = require('express-session');
const { MongoStore } = require('connect-mongo');
const express = require('express');
const cors = require('cors');
const router = require('./route/api');
const { globalError } = require('./utilities/globalError');
const port = process.env.PORT;
db()


const app = express();
app.use(cors());
app.use(express.json());

app.use(session({
    name: "Naraz",
    store: MongoStore.create({ mongoUrl: process.env.MONGODB }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
app.use(process.env.API_URL, router)

app.use(globalError)

app.get('/getSession', (req, res) => {
    console.log(req.session)
    return res.send('get session')
})

app.get("/", async (req, res) => {
    res.send("backend running successfully")
})

app.listen(port, () => {
    console.log(`Backend running on port ${port}`)
})