const { default: mongoose } = require("mongoose");

const banerSchema = new mongoose.Schema({
    image: {
        type: String,
        required: [true, "image is required"]
    },
    url: {
        type: String,
        required: [true, "url is required"]
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Banner", banerSchema)