const express = require('express');
const {UsersController}  = require("../controllers");
const _userController = new UsersController()
const router = express.Router();

router.get("/",_userController.getUsers)
router.get("/:id",_userController.getUser)
router.post("/",_userController.createUser)
router.put("/:id",_userController.updateUser)
router.delete("/:id",_userController.deleteUser)

module.exports = router
