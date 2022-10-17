const express = require("express");
const Joi = require("joi");
var cors = require("cors");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/auth.middleware");

const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const router = express.Router();

router.use(express.json());

router.all("/", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
router.post("/api/register", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    address: req.body.address,
    isAdmin: req.body.isAdmin,
  });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  return res.status(201).json(user);
});

router.post("/api/login", async (req, res) => {
  const result = await User.findOne({
    username: req.body.username,
  });
  if (!result) {
    return res.status(400).send("invalid email or password");
  }

  const isValidPassword = await bcrypt.compare(
    req.body.password,
    result.password
  );
  if (!isValidPassword) {
    return res.status(400).send("invalid email or password");
  }
  const { password, ...others } = result._doc;
  const token = result.generateAuthToken();
  return res.status(200).json({ ...others, token });
});

router.get("/api/user", verifyTokenAndAdmin, async (req, res) => {
  try {
    const users = await User.find().select(
      "username isAdmin email address createdAt"
    );
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/api/user/:id", verifyTokenAndAdmin, async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.delete(
  "/api/user/:id",
  verifyTokenAndAuthorization,
  async (req, res) => {
    const id = req.params.id;
    const foundUser = await User.findById(id);

    if (!foundUser) {
      return res.status(404).json({
        message: "Not Found User",
      });
    }
    try {
      await User.findByIdAndDelete(id);
      return res.status(200).json("User has been deleted");
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

router.put("/api/user/:id", verifyTokenAndAuthorization, async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  const data = req.body;

  try {
    if (user) {
      const result = await User.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true }
      );
      return res.status(201).json(result);
    }
    return res.status(500).json({ message: "user not found" });
  } catch (error) {
    return res.status(500).json(error);
  }
});

const validateUser = (user) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(6),
    username: Joi.string(),
    address: Joi.string(),
    isAdmin: Joi.boolean().default(false),
  });
  return schema.validate(user);
};
module.exports = router;
