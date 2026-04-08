const path = require("path");
const fs = require("fs");
const { apiResponse } = require("../utilities/apiResponse");

exports.replaceImage = async (oldImageUrl) => {
    if (!oldImageUrl) return null;

    const path = require("path");
    const fs = require("fs");
    try {
        const oldPath = path.join(__dirname, `../uploads`, oldImageUrl);
        await fs.promises.unlink(oldPath);

    } catch (error) {
        console.error("Delete error:", error.message);
    }

}
