const express = require("express");
const { addReviewController } = require("../../../controllers/reviewController");
const upload = require("../../../utilities/upload");
const router = express.Router()


router.post("/addReview", upload.array("image", 5), addReviewController)

module.exports = router;