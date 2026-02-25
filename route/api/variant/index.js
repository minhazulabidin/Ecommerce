const express = require("express");
const { addVariantController } = require("../../../controllers/variantController");
const router = express.Router()

router.post("/addVariant", addVariantController)

module.exports = router;