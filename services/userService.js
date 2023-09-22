const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const bcrypt = require("bcryptjs");
const usermodel = require("../models/userModel");
const factory = require("./handlersFactory");
const ApiErorr = require("../utils/apiErorr");

exports.getUsers = factory.getAll(usermodel, "users");

exports.getUser = factory.getOne(usermodel, "user");

exports.creatUser = factory.createOne(usermodel);

exports.updateUser = asyncHandler(async (req, res, next) => {
  if (req.body.name) {
    req.body.slug = slugify(req.body.name);
  } else {
    req.body.slug = slugify(req.body.title);
  }
  const document = await usermodel.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      slug: req.body.slug,
      phone: req.body.phone,
      email: req.body.email,
      profileImage: req.body.profileImage,
      role: req.body.role,
    },
    {
      new: true,
    }
  );
  if (!document) {
    return next(new ApiErorr(`no user for thid id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: document });
});

exports.deleteUser = factory.deleteOne(usermodel, "user");

exports.changeUserPassword = asyncHandler(async (req, res, next) => {
  const document = await usermodel.findByIdAndUpdate(
    req.params.id,
    { password: await bcrypt.hash(req.body.password, 12) },
    {
      new: true,
    }
  );
  if (!document) {
    return next(new ApiErorr(`no user for thid id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: document });
});
