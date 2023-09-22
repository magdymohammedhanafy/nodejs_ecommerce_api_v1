const { Router } = require("express");
const {
  getProductValidator,
  creatProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../utils/validators/productValidator");
const {
  creatProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../services/ProductService");

const router = new Router();
module.exports = router;

router.post("/", creatProductValidator, creatProduct);
router.get("/", getProducts);
router.get("/:id", getProductValidator, getProduct);
router.put("/:id", updateProductValidator, updateProduct);
router.delete("/:id", deleteProductValidator, deleteProduct);
