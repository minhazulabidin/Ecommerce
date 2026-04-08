const { asyncController } = require("../utilities/asyncController");
const bannerModel = require("../model/banner.model");
const { apiResponse } = require("../utilities/apiResponse");
const path = require("path");
const fs = require("fs");
const { replaceImage } = require("../helper/replaceImage");

exports.addBannerController = asyncController(async (req, res) => {
    const { url } = req.body;
    const { filename } = req.file
    const image = `${process.env.SEVER_URL}/${filename}`
    const banner = new bannerModel({
        url, image
    })
    await banner.save()
    apiResponse(201, res, "Banner added successfully", banner)

})

exports.updateBannerController = asyncController(async (req, res) => {
    const { id } = req.params;
    const { url } = req.body;
    const banner = await bannerModel.findById(id);
    if (url !== undefined) banner.url = url;
    if (req.file !== undefined) {
        const { filename } = req.file;
        await replaceImage(banner.image)
        banner.image = `${process.env.SEVER_URL}/${filename}`;
    }
    await banner.save();
    apiResponse(200, res, "Banner updated successfully", banner);
})
