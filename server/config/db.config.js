const { default: mongoose } = require("mongoose");

const db = () => mongoose.connect(process.env.MONGODB).then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.log("Error connecting to MongoDB:", err);
})

module.exports = db;