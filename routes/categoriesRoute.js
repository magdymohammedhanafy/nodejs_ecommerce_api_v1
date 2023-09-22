const { Router } = require("express");
const {
  getCategoryValidator,
  creatCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../utils/validators/categoryValidator");
const {
  creatCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../services/categoryService");
const subCategoryRoute = require("./subCategoryRoute");
const authService = require("../services/authService");

const router = new Router();
module.exports = router;

router.use("/:categoryId/subCategories", subCategoryRoute);

router.post("/", authService.protect, creatCategoryValidator, creatCategory);
router.get("/", getCategories);
router.get("/:id", getCategoryValidator, getCategory);
router.put("/:id", updateCategoryValidator, updateCategory);
router.delete("/:id", deleteCategoryValidator, deleteCategory);
