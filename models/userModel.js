const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Category required"],
    },
    slug: {
      type: String,
      lowecase: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "passowrd is required"],
      minlength: [6, "password is too short"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    active: {
      type: Boolean,
      default: true,
    },
    profileImage: String,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  //if (this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const usermodel = mongoose.model("User", userSchema);

module.exports = usermodel;
