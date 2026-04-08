const { default: mongoose } = require("mongoose");

const merchantSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    },
    storeName: {
        type: String,
        required: [true, "Store name is required"]
    },
    logo: {
        type: String,
    },
    phone: {
        type: String,
    },
    status: {
        type: String,
        enum: ["pending", "rejected", "approved"],
        default: "pending"
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Merchant", merchantSchema)