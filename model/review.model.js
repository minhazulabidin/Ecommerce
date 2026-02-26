const { default: mongoose } = require("mongoose");

const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        require: [true, "user is required"]
    },
    comment: {
        type: String
    },
    ratting: {
        type: Number,
        require: [true, "ratting is required"]
    },
    productId: {
        type: mongoose.Types.ObjectId,
        ref: "Product"
    },
    image: {
        type: String
    },
}, {
    timeStamp: true
})

module.exports = mongoose.model("Review", reviewSchema)