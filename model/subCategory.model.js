const { default: mongoose } = require("mongoose");

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Name is require"]
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("SubCategory", subCategorySchema)