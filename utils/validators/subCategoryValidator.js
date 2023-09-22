const { check } = require("express-validator");
const {
  validatorMiddleWare,
} = require("../../middleWares/validatorMiddleWare");

exports.getSubCategoryValidator = [
  check("id").isMongoId().withMessage("not valid category id"),
  validatorMiddleWare,
];

exports.creatSubCategoryValidator = [
  check("name")
    .isString()
    .withMessage("Category name should be string")
    .notEmpty()
    .withMessage("Category required")
    .isLength({ min: 2 })
    .withMessage("Too short caregory name")
    .isLength({ max: 32 })
    .withMessage("Too long category name"),
  validatorMiddleWare,
  check("category")
    .isMongoId()
    .notEmpty()
    .withMessage("subCategory must be belong to Category")
    .withMessage("not valid category id "),
  validatorMiddleWare,
];

exports.updateSubCategoryValidator = [
  check("id").isMongoId().withMessage("not valid category id format"),
  validatorMiddleWare,
  check("name")
    .isString()
    .withMessage("Category name should be string")
    .notEmpty()
    .withMessage("Category required")
    .isLength({ min: 2 })
    .withMessage("Too short caregory name")
    .isLength({ max: 32 })
    .withMessage("Too long category name"),
  validatorMiddleWare,
  check("category")
    .isMongoId()
    .notEmpty()
    .withMessage("subCategory must be belong to Category")
    .withMessage("not valid category id "),
  validatorMiddleWare,
];

exports.deleteSubCategoryValidator = [
  check("id").isMongoId().withMessage("not valid category id"),
  validatorMiddleWare,
];
