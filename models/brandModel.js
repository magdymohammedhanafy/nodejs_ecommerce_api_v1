const mongoose = require("mongoose");

//creat Schema
const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Brand required"],
      unique: [true, "Brand must be unique"],
      minLength: [3, "Too short brand name"],
      maxLength: [32, "Too long brand name"],
    },
    slug: {
      type: String,
      lowecase: true,
    },
    image: String,
  },
  { timestamps: true }
);
//creat model
const Brandmodel = mongoose.model("Brand", brandSchema);

module.exports = Brandmodel;
