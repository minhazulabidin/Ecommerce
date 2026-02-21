const categoryModel = require("../model/category.model");
const subCategoryModel = require("../model/subCategory.model");
const { apiResponse } = require("../utilities/apiResponse");
const { asyncController } = require("../utilities/asyncController");
const slugify = require("slugify")

exports.subCategoryController = asyncController(async (req, res) => {
    const { name, categoryId } = req.body;
    const slug = slugify(name, {
        replacement: '-',
        remove: undefined,
        lower: true,
        trim: true
    })
    const subCategory = new subCategoryModel({
        name, slug, categoryId
    })

    await subCategory.save();

    await categoryModel.findOneAndUpdate({ _id: categoryId },
        { $push: { subCategory: subCategory._id } },
        { new: true })

    apiResponse(200, res, "Sub-Category create successfully", subCategory)
})

exports.updateSubCategoryController = asyncController(async (req, res) => {
    const { id } = req.params;
    const { name, categoryId } = req.body;

    const subCategory = await subCategoryModel.findById(id);
    if (!subCategory) {
        return apiResponse(404, res, "Sub-Category not found");
    }
    if (name) {
        subCategory.name = name;
        subCategory.slug = slugify(name, {
            replacement: '-',
            lower: true,
            trim: true
        });
    }
    if (categoryId) {
        await categoryModel.findByIdAndUpdate(
            subCategory.categoryId,
            { $pull: { subCategory: id } }
        );
        subCategory.categoryId = categoryId;
        await categoryModel.findByIdAndUpdate(
            categoryId,
            { $addToSet: { subCategory: id } }
        );
    }

    await subCategory.save();

    apiResponse(200, res, "Sub-Category updated successfully", subCategory);
});


exports.deleteSubCategoryController = asyncController(async (req, res) => {
    const { id } = req.params;
    await subCategoryModel.findOneAndDelete({ _id: id })
    await categoryModel.findOneAndUpdate({ subCategory: id }, { $pull: { subCategory: id } }, { new: true })
    apiResponse(200, res, "Sub-Category deleted successfully")
})
