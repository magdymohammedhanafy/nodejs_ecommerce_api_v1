const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const ApiErorr = require("../utils/apiErorr");
const ApiFeatures = require("../utils/apiFeature");

exports.deleteOne = (model, name) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    const document = await model.findByIdAndDelete(id);
    if (!document) {
      return next(new ApiErorr(`no ${name} for thid id ${id}`, 404));
    }
    res.status(204).json("true");
  });

exports.updateOne = (model, name) =>
  asyncHandler(async (req, res, next) => {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    } else {
      req.body.slug = slugify(req.body.title);
    }
    const document = await model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!document) {
      return next(new ApiErorr(`no ${name} for thid id ${req.params.id}`, 404));
    }
    res.status(200).json({ data: document });
  });

exports.createOne = (model) =>
  asyncHandler(async (req, res) => {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    } else {
      req.body.slug = slugify(req.body.title);
    }
    const document = await model.create(req.body);
    res.status(200).json({ data: document });
  });

exports.getOne = (model, name) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await model.findById(id);
    if (!document) {
      return next(new ApiErorr(`no ${name} for thid id ${id}`, 404));
    }
    res.status(200).json({ data: document });
  });

exports.getAll = (model, name) =>
  asyncHandler(async (req, res) => {
    let filter = {};
    if (req.filterObject) {
      filter = req.filterObject;
    }
    const documntCounts = await model.countDocuments();
    const apiFeatures = new ApiFeatures(model.find(filter), req.query)
      .pagination(documntCounts)
      .sorting()
      .filter()
      .search(name)
      .limitFields();
    //excute query
    const { mongooseQuery, paginationResult } = apiFeatures;
    const documents = await mongooseQuery;
    res
      .status(200)
      .json({ results: documents.length, paginationResult, data: documents });
  });
