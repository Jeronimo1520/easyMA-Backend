const express = require('express');
const {ProductsController} = require("../controllers");
const _productController = new ProductsController();
const router = express.Router();

router.get("/",_productController.getProducts)
router.get("/:id",_productController.getProduct)
router.post("/",_productController.createProduct)
router.put("/:id",_productController.updateProduct)
router.delete("/:id",_productController.deleteProduct)
router.post("/:id/document_profile", _productController.createdocumentProfile)

module.exports = router