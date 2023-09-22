const { check } = require("express-validator");
const {
  validatorMiddleWare,
} = require("../../middleWares/validatorMiddleWare");

exports.signUpValidator = [
  check("name")
    .isString()
    .withMessage("user name should be string")
    .notEmpty()
    .withMessage("user required")
    .isLength({ min: 3 })
    .withMessage("Too short password name"),
  validatorMiddleWare,
  check("email")
    .isString()
    .withMessage("user email should be string")
    .notEmpty()
    .withMessage("user email required")
    .isEmail()
    .withMessage("not valid email form"),
  validatorMiddleWare,
  check("password")
    .isString()
    .withMessage("user password should be string")
    .notEmpty()
    .withMessage("user password required")
    .isLength({ min: 6 })
    .withMessage("Too short password name")
    .custom(async (val, { req }) => {
      if (val !== req.body.passwordConfirm) {
        throw new Error("password and passwordConfirm should be equal");
      }
    }),
  validatorMiddleWare,
  check("passwordConfirm")
    .notEmpty()
    .withMessage("user passwordConfirm required"),
  validatorMiddleWare,
];

exports.loginValidator = [
  check("email")
    .isString()
    .withMessage("user email should be string")
    .notEmpty()
    .withMessage("user email required")
    .isEmail()
    .withMessage("not valid email form"),
  validatorMiddleWare,
  check("password")
    .isString()
    .withMessage("user password should be string")
    .notEmpty()
    .withMessage("user password required")
    .isLength({ min: 6 })
    .withMessage("Too short password name"),
  validatorMiddleWare,
];
