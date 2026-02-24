const { default: mongoose } = require("mongoose");

const categorySchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Name is required"]
    },
    slug: {
        type: String,
        required: [true, "Slug is required"]
    },
    subCategory: [
        {
            type: mongoose.Types.ObjectId,
            ref: "SubCategory",
        }
    ],
    product: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Product",
        }
    ],
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