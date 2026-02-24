const { default: mongoose } = require("mongoose");

const variantSchema = new mongoose.Schema({
    color: {
        type: String,
        trim: true
    },
    size: {
        type: String,
        trim: true
    },
    quantity: {
        type: Number,
        trim: true
    },
    sku: {
        type: String,
        trim: true,
        require: [true, "sku is required"]
    }
}, { timeStamps: true })

module.exports = mongoose.model("Variant", variantSchema)