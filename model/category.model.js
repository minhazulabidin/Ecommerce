const { default: mongoose } = require("mongoose");

const categorySchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Name is required"]
    },
    subCategory: {

    },
    discount: {
        type: Number
    },
    image: {
        type: String,
        required: [true, "Image is required"]
    }

},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Category", categorySchema)