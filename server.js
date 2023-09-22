const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const ApiErorr = require("./utils/apiErorr");
const globalErorr = require("./middleWares/erorrMiddleWare");
const categoryRoute = require("./routes/categoriesRoute");
const subCategoryRoute = require("./routes/subCategoryRoute");
const brandRoute = require("./routes/brandRoute");
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const dbConnection = require("./config/database");

dotenv.config({ path: "config.env" });

//connect to data base
dbConnection();

//express app
const app = express();

//middle ware
if (process.env.NODE_ENV === "development") {
  console.log("dev mode");
  app.use(morgan("dev"));
}
app.use(express.json());

//routes
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/subCategories", subCategoryRoute);
app.use("/api/v1/brands", brandRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);

app.all("*", (req, res, next) => {
  next(new ApiErorr(`cant find this route ${req.originalUrl}`, 400));
});

//global erorr handeling middle ware for express
app.use(globalErorr);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log("server running at http://localhost:8000");
});

//global erorr handeling outside express
process.on("unhandledRejection", (err) => {
  console.error(`unhandledRejection Erorr: ${err.name}|${err.message}`);
  server.close(() => {
    console.error("Shutting Down......");
    process.exit(1);
  });
});
