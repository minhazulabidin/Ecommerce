const { default: mongoose } = require("mongoose");

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    },
    comment: {
        type: String
    },
    ratting:{
        type:Number,
        require: [true, "ratting is required"]
    },
    image: {
        type: String
    },
}, {
    timeStamp: true
})

module.exports = mongoose.model("Review", reviewSchema)