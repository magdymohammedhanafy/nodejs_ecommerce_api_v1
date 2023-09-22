const subCategorymodel = require("../models/subCategoryModel");
const factory = require("./handlersFactory");

//get sub categories related to category id
exports.getSubCategories = factory.getAll(subCategorymodel, "subCategories");

exports.getSubCategory = factory.getOne(subCategorymodel, "subCategory");

exports.creatSubCategory = factory.createOne(subCategorymodel);

exports.updateSubCategory = factory.updateOne(subCategorymodel, "subCategory");

exports.deleteSubCategory = factory.deleteOne(subCategorymodel, "subCategory");

exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) {
    req.body.category = req.params.categoryId;
  }
  next();
};

exports.setFilterObject = (req, res, next) => {
  if (req.params.categoryId) {
    let filterObject = {};
    filterObject = { category: req.params.categoryId };
    req.filterObject = filterObject;
  }
  next();
};
