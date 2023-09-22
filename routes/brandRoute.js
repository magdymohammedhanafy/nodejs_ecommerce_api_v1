const { Router } = require("express");
const {
  getBrandValidator,
  creatBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require("../utils/validators/brandValidator");
const {
  creatBrand,
  getBrands,
  getBrand,
  updateBrand,
  deleteBrand,
} = require("../services/brandService");

const router = new Router();
module.exports = router;

router.post("/", creatBrandValidator, creatBrand);
router.get("/", getBrands);
router.get("/:id", getBrandValidator, getBrand);
router.put("/:id", updateBrandValidator, updateBrand);
router.delete("/:id", deleteBrandValidator, deleteBrand);
