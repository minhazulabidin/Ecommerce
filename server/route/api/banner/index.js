const express = require("express");
const {
  addBannerController,
  updateBannerController,
  getAllBannerController,
} = require("../../../controllers/bannerController");
const upload = require("../../../utilities/upload");
const { isAuthorize } = require("../../../middleware/isAuthorize");
const { isAuthorizeRole } = require("../../../middleware/isAuthorizeRole");
const router = express.Router();

router.post(
  "/addBanner",
  isAuthorize,
  isAuthorizeRole("admin"),
  upload.single("image"),
  addBannerController,
);
router.patch(
  "/updateBanner/:id",
  isAuthorize,
  isAuthorizeRole("admin"),
  upload.single("image"),
  updateBannerController,
);
router.get("/allBanner", getAllBannerController);

module.exports = router;
