const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const ApiErorr = require("../utils/apiErorr");
const userModel = require("../models/userModel");
const usermodel = require("../models/userModel");
//generate token
const generateToken = (payLoad) =>
  jwt.sign(payLoad, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });

exports.signUp = asyncHandler(async (req, res, next) => {
  const user = await userModel.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  const token = generateToken({ userId: user._id });

  res.status(201).json({ data: user, token });
});

exports.login = asyncHandler(async (req, res, next) => {
  const user = await userModel.findOne({ email: req.body.email });

  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiErorr("incorrect email or password", 401));
  }
  const token = generateToken({ userId: user._id });

  res.status(200).send({ data: user, token });
});

exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("bearer")
  ) {
    token = req.headers.authorization.split(" ").at(-1);
  }
  if (!token) {
    return next(new ApiErorr("you are not login ,please login ", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const user = await usermodel.findById(decoded.userId);
  if (!user) {
    next(new ApiErorr("the user belongs this token is not exsist"), 401);
  }
});
