const path = require("path");
const fs = require("fs");
const { apiResponse } = require("../utilities/apiResponse");

exports.replaceImage = async (oldImageUrl, res, uploadFolder = "uploads") => {
    if (!oldImageUrl) return null;

    const fileParts = oldImageUrl.split("/");
    const oldImageName = fileParts[fileParts.length - 1];

    const oldPath = path.join(__dirname, `../${uploadFolder}`, oldImageName);

    try {
        return await fs.promises.unlink(oldPath);
    } catch (err) {
        apiResponse(400, res, err.message)
    }
}
