const express = require('express');
const productRouter = require("./products.router");
const router = express.Router();
// const userRouter = require("./products.router")
// const sellerRouter = require("./products.router")
// const supplierRouter = require("./products.router")
router.use("/products",productRouter);
module.exports = router