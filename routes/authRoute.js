const { Router } = require("express");
const {
  signUpValidator,
  loginValidator,
} = require("../utils/validators/authValidator");
const { signUp, login } = require("../services/authService");

const router = new Router();
module.exports = router;

router.post("/signup", signUpValidator, signUp);
router.post("/login", loginValidator, login);
