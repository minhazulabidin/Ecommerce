const merchantModel = require("../model/merchant.model");
const { apiResponse } = require("../utilities/apiResponse");
const { asyncController } = require("../utilities/asyncController");

exports.applyMerchantController = asyncController(async (req, res) => {
    const { userId, phone, storeName, logo } = req.body;
    const merchant = await merchantModel.findOne({ userId })

    if (merchant) {
        return apiResponse(400, res, "Merchant already apply")
    } else {
        const merchantApply = new merchantModel({
            userId, phone, storeName, logo
        })
        await merchantApply.save()
        apiResponse(200, res, "Merchant apply successfully", merchantApply)
    }
})

exports.approveMerchantController = asyncController(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const approveMerchant = await merchantModel.findOneAndUpdate({ _id: id }, { status }, { new: true })
    apiResponse(200, res, "Merchant update successfully", approveMerchant)
})