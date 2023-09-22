const mongoose = require("mongoose");

//creat Schema
const subcategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      minLength: [2, "Too short subCaregory name"],
      maxLength: [32, "Too long subCategory name"],
    },
    slug: {
      type: String,
      lowecase: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "subCategory must belongs to parent category "],
    },
  },
  { timestamps: true }
);
//creat model
const subCategorymodel = mongoose.model("subCategory", subcategorySchema);
module.exports = subCategorymodel;
