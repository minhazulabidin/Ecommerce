const express = require("express")
const { applyMerchantController, approveMerchantController } = require("../../../controllers/merchantController")
const { isAuthorize } = require("../../../middleware/isAuthorize")
const { isAuthorizeRole } = require("../../../middleware/isAuthorizeRole")
const router = express.Router()

router.post("/applyMerchant", applyMerchantController)
router.patch("/approveMerchant/:id", isAuthorize, isAuthorizeRole("admin"), approveMerchantController)


module.exports = router