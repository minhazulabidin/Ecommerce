const express = require("express");
const { addBannerController, updateBannerController } = require("../../../controllers/bannerController");
const upload = require("../../../utilities/upload");
const { isAuthorize } = require("../../../middleware/isAuthorize");
const { isAuthorizeRole } = require("../../../middleware/isAuthorizeRole");
const router = express.Router()

router.post("/addBanner", upload.single("image"), addBannerController)
router.patch("/updateBanner/:id", upload.single("image"), updateBannerController)

module.exports = router;