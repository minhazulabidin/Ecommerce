const { default: mongoose } = require("mongoose");

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Name is require"]
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "category"
    }
})

module.exports = mongoose.model("Sub-Category", subCategorySchema)