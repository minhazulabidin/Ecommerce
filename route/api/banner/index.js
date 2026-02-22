const express = require("express");
const { addBannerController } = require("../../../controllers/bannerController");
const upload = require("../../../utilities/upload");
const router = express.Router()

router.post("/addBanner", upload.single("image"), addBannerController)

module.exports = router;