const { default: mongoose } = require("mongoose");

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    },
    comment: {
        type: String,
        require: [true, "comment is required"]
    },
    image: {
        type: String
    },
}, {
    timeStamp: true
})

module.exports = mongoose.model("Review", reviewSchema)