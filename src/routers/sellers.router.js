const express = require('express');
const { SellersController } = require("../controllers");
const _sellerController = new SellersController();
const router = express.Router();

router.get("/", _sellerController.getSellers)
router.get("/:id", _sellerController.getSeller)
router.post("/", _sellerController.createSeller)
router.put("/:id", _sellerController.updateSeller)
router.delete("/:id", _sellerController.deleteSeller)

module.exports = router