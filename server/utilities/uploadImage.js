const cloudinary = require("../config/cloudinary.config");

const uploadImage = async (path,folder) => {
    const uploadResult = await cloudinary.uploader
        .upload(
            path,{
                folder: folder 
            }
        )
        .catch((error) => {
            console.log(error);
        });
    const { url, public_id } = uploadResult
    return { url, public_id };
}

module.exports = uploadImage;
