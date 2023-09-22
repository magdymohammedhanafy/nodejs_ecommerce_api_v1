const { Router } = require("express");
const {
  getSubCategoryValidator,
  creatSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} = require("../utils/validators/subCategoryValidator");
const {
  creatSubCategory,
  getSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
  setCategoryIdToBody,
  setFilterObject,
} = require("../services/subCategoryService");

const router = new Router({ mergeParams: true });
module.exports = router;
router.post(
  "/",
  setCategoryIdToBody,
  creatSubCategoryValidator,
  creatSubCategory
);
router.get("/", setFilterObject, getSubCategories);
router.get("/:id", getSubCategoryValidator, getSubCategory);
router.put("/:id", updateSubCategoryValidator, updateSubCategory);
router.delete("/:id", deleteSubCategoryValidator, deleteSubCategory);
