const { Router } = require("express");
const {
  getUserValidator,
  creatUserValidator,
  updateUserValidator,
  deleteUserValidator,
  changeUserPasswordValidator,
} = require("../utils/validators/userValidator");
const {
  creatUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  changeUserPassword,
} = require("../services/userService");

const router = new Router();
module.exports = router;

router.post("/", creatUserValidator, creatUser);
router.get("/", getUsers);
router.get("/:id", getUserValidator, getUser);
router.put("/:id", updateUserValidator, updateUser);
router.put(
  "/changePassword/:id",
  changeUserPasswordValidator,
  changeUserPassword
);
router.delete("/:id", deleteUserValidator, deleteUser);
