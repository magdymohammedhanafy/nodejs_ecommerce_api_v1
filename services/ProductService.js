const Productmodel = require("../models/productModel");
const factory = require("./handlersFactory");

exports.getProducts = factory.getAll(Productmodel, "products");

exports.getProduct = factory.getOne(Productmodel, "product");

exports.creatProduct = factory.createOne(Productmodel);

exports.updateProduct = factory.updateOne(Productmodel, "product");

exports.deleteProduct = factory.deleteOne(Productmodel, "product");
