const brandmodel = require("../models/brandModel");

const factory = require("./handlersFactory");

exports.getBrands = factory.getAll(brandmodel, "brands");

exports.getBrand = factory.getOne(brandmodel, "brand");

exports.creatBrand = factory.createOne(brandmodel);

exports.updateBrand = factory.updateOne(brandmodel, "brand");

exports.deleteBrand = factory.deleteOne(brandmodel, "brand");
