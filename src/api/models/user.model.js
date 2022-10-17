const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("email is invalid");
      }
    },
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    unique: true,
  },
  bio: String,
  address: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isAdmin: { type: Boolean, default: false },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this.id, isAdmin: this.isAdmin }, "jwtKeyUser");
  return token;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
