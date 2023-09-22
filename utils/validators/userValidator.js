const { check } = require("express-validator");
const bcrypt = require("bcryptjs");
const {
  validatorMiddleWare,
} = require("../../middleWares/validatorMiddleWare");
const userModel = require("../../models/userModel");

exports.getUserValidator = [
  check("id").isMongoId().withMessage("not valid brand id"),
  validatorMiddleWare,
];

exports.creatUserValidator = [
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

  check("profileImage").optional(),
  validatorMiddleWare,
  check("role").optional(),
  validatorMiddleWare,
  check("active").optional(),
  validatorMiddleWare,
  check("phone")
    .optional()
    .isMobilePhone(["ar-EG", "ar-SA"])
    .withMessage("not valid phone number"),
  validatorMiddleWare,
];

exports.updateUserValidator = [
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
  check("profileImage").optional(),
  validatorMiddleWare,
  check("role").optional(),
  validatorMiddleWare,
  check("phone")
    .optional()
    .isMobilePhone(["ar-EG", "ar-SA"])
    .withMessage("not valid phone number"),
  validatorMiddleWare,
];

exports.changeUserPasswordValidator = [
  check("currentPassword")
    .notEmpty()
    .withMessage("you must enter your current password"),
  check("passwordConfirm")
    .notEmpty()
    .withMessage("you must enter password confirm"),
  check("password")
    .notEmpty()
    .withMessage("you must enter password ")
    .custom(async (val, { req }) => {
      //confirm pass equal current pass
      const user = await userModel.findById(req.params.id);
      if (!user) {
        throw new Error("not valid id");
      }
      console.log(req.body.currentPassword);
      console.log(user.password);
      const isCorrectPassword = await bcrypt.compare(
        req.body.currentPassword,
        user.password
      );
      if (!isCorrectPassword) {
        throw new Error("incorrect current pass");
      }
      if (val !== req.body.passwordConfirm) {
        throw new Error("password and passwordConfirm should be equal");
      }
    }),
  validatorMiddleWare,
];

exports.deleteUserValidator = [
  check("id").isMongoId().withMessage("not valid user id"),
  validatorMiddleWare,
];
