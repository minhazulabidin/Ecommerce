const { default: mongoose } = require("mongoose");

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Name is require"]
    },
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
    },
    slug: {
        type: String,
        required: [true, "Slug is required"]
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("SubCategory", subCategorySchema)