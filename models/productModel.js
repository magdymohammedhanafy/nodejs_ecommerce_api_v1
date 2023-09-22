const mongoose = require("mongoose");

//creat Schema
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Category required"],
      unique: true,
      minLength: [3, "Too short caregory name"],
      maxLength: [100, "Too long category name"],
    },
    slug: {
      type: String,
      lowecase: true,
    },
    description: {
      type: String,
      required: [true, "descreption required"],
      minLength: [20, "Too short product descreption"],
    },
    quantity: {
      type: Number,
      required: [true, "quantity required"],
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      trim: true,
      required: [true, "price required"],
      max: [2000, "Too long product price"],
    },
    priceAfterDiscount: {
      type: Number,
    },
    colors: [String],
    imageCover: {
      type: String,
      required: [true, "image cover is required"],
    },
    image: [String],
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "product must be belong category"],
    },
    subCategory: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "subCategory",
      },
    ],
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: "Brand",
    },
    ratingsAverage: {
      type: Number,
      min: [1, "rating should be equal or above 1"],
      max: [5, "rating should be equal or under 5"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
productSchema.pre(/^find/, function (next) {
  this.populate({ path: "category", select: "name" });
  next();
});
//creat model
const Productmodel = mongoose.model("Product", productSchema);

module.exports = Productmodel;
