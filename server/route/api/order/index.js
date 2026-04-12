const express = require("express");
const { placeOrderController, allPlaceOrderController } = require("../../../controllers/orderController");
const { isAuthorize } = require("../../../middleware/isAuthorize");
const router = express.Router();

router.post("/place-order", isAuthorize, placeOrderController)
router.get("/all-order", allPlaceOrderController)

module.exports = router;