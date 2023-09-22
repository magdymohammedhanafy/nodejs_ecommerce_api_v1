const ApiErorr = require("../utils/apiErorr");

const handleJwtInvalidSignature = () =>
  new ApiErorr("invalid token ,please login again", 401);

const handleJwtExpired = () =>
  new ApiErorr("expired token ,please login again", 401);
const globalErorr = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "erorr";
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-use-before-define
    sendErorrForDev(err, res);
  } else {
    // eslint-disable-next-line no-use-before-define
    if (err.name === "JsonWebTokenError") err = handleJwtInvalidSignature();
    if (err.name === "TokenExpiredError") err = handleJwtExpired();
    sendErorrForProduction(err, res);
  }
};

const sendErorrForDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    erorr: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErorrForProduction = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

module.exports = globalErorr;
