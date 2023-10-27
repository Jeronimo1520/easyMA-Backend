const express = require('express');
const { CustomersController } = require("../controllers");
const _customerController = new CustomersController();
const router = express.Router();

router.get("/", _customerController.getCustomers)
router.get("/:id", _customerController.getCustomer)
router.post("/", _customerController.createCustomer)
router.put("/:id", _customerController.updateCustomer)
router.delete("/:id", _customerController.deleteCustomer)

module.exports = router