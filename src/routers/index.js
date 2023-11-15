const express = require("express");
const productRouter = require("./products.router");
const customerRouter = require("./customers.router");
const sellerRouter = require("./sellers.router");
const usersRouter = require("./users.router");
const providerRouter = require('./providers.router');
//clase
const { AuthController } = require("../controllers");
const { AuthMiddleware } = require("../middleware/auth.middleware");
//instancia
const authController = new AuthController();
const router = express.Router();

router.use((req, res, next) => {
  console.log("Middleware - Audiencia");
  next();
});

router.post("/login", authController.login);
router.use("/users", [AuthMiddleware], usersRouter);

router.use(AuthMiddleware);
router.use("/products", productRouter);
router.use("/customers", customerRouter);
router.use("/sellers", sellerRouter);
router.use("/providers", providerRouter);
router.post("/verify", authController.verifyToken);

module.exports = router;
