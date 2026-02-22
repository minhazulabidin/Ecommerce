const { asyncController } = require("../utilities/asyncController");
const bannerModel = require("../model/banner.model");
const { apiResponse } = require("../utilities/apiResponse");

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
