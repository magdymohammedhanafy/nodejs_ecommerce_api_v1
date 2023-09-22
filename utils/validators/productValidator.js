const { check } = require("express-validator");
const {
  validatorMiddleWare,
} = require("../../middleWares/validatorMiddleWare");
const categoryModel = require("../../models/categoryModel");
const subCategoryModel = require("../../models/subCategoryModel");

exports.getProductValidator = [
  check("id").isMongoId().withMessage("not valid product id"),
  validatorMiddleWare,
];

exports.creatProductValidator = [
  check("title")
    .isString()
    .withMessage("Product name should be string")
    .notEmpty()
    .withMessage("Product required")
    .isLength({ min: 3 })
    .withMessage("Too short product title")
    .isLength({ max: 100 })
    .withMessage("Too long product title"),
  validatorMiddleWare,
  check("description")
    .isString()
    .withMessage("descreption  should be string")
    .notEmpty()
    .withMessage("Product descreption required")
    .isLength({ max: 2000 })
    .withMessage("Too long product descreption"),
  validatorMiddleWare,
  check("quantity")
    .isNumeric()
    .withMessage("quantity should be number")
    .notEmpty()
    .withMessage("product quantity is required"),
  validatorMiddleWare,
  check("sold").optional().isNumeric().withMessage("sold should be number"),
  validatorMiddleWare,
  check("price")
    .isNumeric()
    .withMessage("price should be number")
    .notEmpty()
    .withMessage("product price is required")
    .isLength({ max: 2000 })
    .withMessage("Too long price "),
  validatorMiddleWare,
  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .withMessage("price discount should be number")
    .toFloat(),

  /* .custom((value, { req }) => {
      if (req.body.price <= value) {
        throw new Error("price after discount should be lower than price");
      } else {
        console.log("magdy");
      }
    })*/ validatorMiddleWare,
  check("colors")
    .optional()
    .isArray()
    .withMessage("available color should be array of strings"),
  validatorMiddleWare,
  check("imageCover").notEmpty().withMessage("product image cover is required"),
  validatorMiddleWare,
  check("images")
    .optional()
    .isArray()
    .withMessage("available images should be array of strings"),
  validatorMiddleWare,
  check("category")
    .notEmpty()
    .withMessage("product should be belongs to category")
    .isMongoId()
    .withMessage("invalid id format")
    .custom(async (category) => {
      const dbCategory = await categoryModel.findById(category);

      if (!dbCategory) {
        throw new Error("invalid category id");
      }
    }),
  validatorMiddleWare,
  check("subCategory")
    .optional()
    .isMongoId()
    .withMessage("invalid id format")
    .custom(async (subCategory) => {
      const subCategories = await subCategoryModel.find({
        _id: { $exists: true, $in: subCategory },
      });
      if (subCategories.length !== subCategory.length) {
        throw new Error("not valid sub categries id");
      }
    })
    .custom(async (subCategory, { req }) => {
      const subCategories = await subCategoryModel.find({
        category: req.body.category,
      });
      const subCategoriesIdInDB = [];
      subCategories.forEach((item) => {
        subCategoriesIdInDB.push(item._id.toString());
      });

      if (!subCategory.every((v) => subCategoriesIdInDB.includes(v))) {
        throw new Error("subCategory not belong this category");
      }
    }),
  validatorMiddleWare,
  check("brand").optional().isMongoId().withMessage("invalid id format"),
  validatorMiddleWare,
  check("ratingsAverage")
    .optional()
    .isNumeric()
    .withMessage("rating average must be number")
    .isLength({ min: 1 })
    .withMessage("min rating should be 1")
    .isLength({ max: 5 })
    .withMessage("max rating should be 5"),
  validatorMiddleWare,
  check("ratingsQuantity")
    .optional()
    .isNumeric()
    .withMessage("rating quantity must be number"),
  validatorMiddleWare,
];

exports.updateProductValidator = [
  check("id").isMongoId().withMessage("not valid category id"),
  validatorMiddleWare,
  check("title")
    .isString()
    .withMessage("Product name should be string")
    .notEmpty()
    .withMessage("Product required")
    .isLength({ min: 3 })
    .withMessage("Too short product title")
    .isLength({ max: 100 })
    .withMessage("Too long product title"),
  validatorMiddleWare,
  check("description")
    .isString()
    .withMessage("descreption  should be string")
    .notEmpty()
    .withMessage("Product descreption required")
    .isLength({ max: 2000 })
    .withMessage("Too long product descreption"),
  validatorMiddleWare,
  check("quantity")
    .isNumeric()
    .withMessage("quantity should be number")
    .notEmpty()
    .withMessage("product quantity is required"),
  validatorMiddleWare,
  check("sold").optional().isNumeric().withMessage("sold should be number"),
  validatorMiddleWare,
  check("price")
    .isNumeric()
    .withMessage("price should be number")
    .notEmpty()
    .withMessage("product price is required")
    .isLength({ max: 32 })
    .withMessage("Too long price "),
  validatorMiddleWare,
  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .withMessage("price discount should be number")
    .toFloat()
    .custom((value, { req }) => {
      if (req.body.price <= value) {
        throw new Error("price after discount should be lower than price");
      }
    }),
  validatorMiddleWare,
  check("colors")
    .optional()
    .isArray()
    .withMessage("available color should be array of strings"),
  validatorMiddleWare,
  check("imageCover").notEmpty().withMessage("product image cover is required"),
  validatorMiddleWare,
  check("images")
    .optional()
    .isArray()
    .withMessage("available images should be array of strings"),
  validatorMiddleWare,
  check("category")
    .notEmpty()
    .withMessage("product should be belongs to category")
    .isMongoId()
    .withMessage("invalid id format"),
  validatorMiddleWare,
  check("subCategory").optional().isMongoId().withMessage("invalid id format"),
  validatorMiddleWare,
  check("brand").optional().isMongoId().withMessage("invalid id format"),
  validatorMiddleWare,
  check("ratingAverage")
    .optional()
    .isNumeric()
    .withMessage("rating average must be number")
    .isLength({ min: 1 })
    .withMessage("min rating should be 1")
    .isLength({ max: 5 })
    .withMessage("max rating should be 5"),
  validatorMiddleWare,
  check("ratingQuantity")
    .optional()
    .isNumeric()
    .withMessage("rating quantity must be number"),
  validatorMiddleWare,
];

exports.deleteProductValidator = [
  check("id").isMongoId().withMessage("not valid category id"),
  validatorMiddleWare,
];
