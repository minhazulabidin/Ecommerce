const express = require('express');
const { addProductController, deleteProductController, allProductController, singleProductController } = require('../../../controllers/productController');
const upload = require('../../../utilities/upload');
const router = express.Router()

router.post('/addProduct', upload.array("image", 5), addProductController)
router.delete('/deleteProduct/:id', deleteProductController)
router.get('/allProducts', allProductController)
router.get('/singleProduct/:slug', singleProductController)

module.exports = router;