const express = require("express");
const {
  addProductController,
  deleteProductController,
  allProductController,
  singleProductController,
  updateProductController,
} = require("../../../controllers/productController");
const upload = require("../../../utilities/upload");
const router = express.Router();

router.post("/addProduct", upload.array("image", 5), addProductController);
router.delete("/deleteProduct/:id", deleteProductController);
router.get("/allProducts", allProductController);
router.get("/:slug", singleProductController);
router.patch(
  "/product-update/:id",
  upload.array("image", 5),
  updateProductController,
);

module.exports = router;
