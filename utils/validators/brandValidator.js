const { check } = require("express-validator");
const {
  validatorMiddleWare,
} = require("../../middleWares/validatorMiddleWare");

exports.getBrandValidator = [
  check("id").isMongoId().withMessage("not valid brand id"),
  validatorMiddleWare,
];

exports.creatBrandValidator = [
  check("name")
    .isString()
    .withMessage("brand name should be string")
    .notEmpty()
    .withMessage("brand required")
    .isLength({ min: 3 })
    .withMessage("Too short brand name")
    .isLength({ max: 32 })
    .withMessage("Too long brand name"),
  validatorMiddleWare,
];

exports.updateBrandValidator = [
  check("id").isMongoId().withMessage("not valid brand id"),
  validatorMiddleWare,
  check("name")
    .isString()
    .withMessage("brand name should be string")
    .notEmpty()
    .withMessage("brand required")
    .isLength({ min: 3 })
    .withMessage("Too short brand name")
    .isLength({ max: 32 })
    .withMessage("Too long brand name"),
  validatorMiddleWare,
];

exports.deleteBrandValidator = [
  check("id").isMongoId().withMessage("not valid brand id"),
  validatorMiddleWare,
];
