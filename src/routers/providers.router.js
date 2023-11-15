const express = require('express');
const {ProvidersController} = require("../controllers");
const _providerController = new ProvidersController();
const router = express.Router();

router.get("/",_providerController.getProviders)
router.get("/:id",_providerController.getProvider)
router.post("/",_providerController.createProvider)
router.put("/:id",_providerController.updateProvider)
router.delete("/:id",_providerController.deleteProvider)

module.exports = router