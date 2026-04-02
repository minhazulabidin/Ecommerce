const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Name is required"]
    },
    sku: {
        type: String,
        trim: true,
        required: [true, "sku is required"]
    },
    slug: {
        type: String,
        required: [true, "Slug is required"]
    },
    price: {
        type: Number,
        trim: true,
        required: [true, "Price is required"]
    },
    discountPrice: {
        type: Number,
    },
    rating: {
        type: Number,
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    image: [
        {
            url: String,
            public_id: String
        }
    ],
    subCategory: {
        type: mongoose.Types.ObjectId,
        ref: "SubCategory",
        // required: [true, "subCategory is required"]  
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        required: [true, "category is required"]
    },
    variantType: {
        type: String,
        enum: ["singleVariant", "multiVariant"],
        default: "singleVariant"
    },
    variant: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Variant"
        }
    ],
    review: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Review"
        }
    ]
}, {
    timestamps: true
})

module.exports = mongoose.model("Product", productSchema)