const { default: mongoose } = require("mongoose")

exports.dbConfig = () => {
    mongoose.connect(process.env.DB_URL).then(() => {
        console.log('Connected to MongoDB')
    }).catch((err) => {
        console.log('Error connecting to MongoDB:', err)
    })
}