const express = require("express");
const Joi = require("joi");
const Order = require("../models/order.model");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/api/order", verifyToken, async (req, res) => {
  const newOrder = new Order({
    user: req.user._id,
    orderDetails: req.body.orderDetails,
    paymentMethod: req.body.paymentMethod,
    amount: req.body.amount,
    address: req.body.address,
  });

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.put("/api/order/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.delete("/api/order/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get(
  "/api/order/find/:id",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      const orders = await Order.findById(req.params.id).populate(
        "user",
        "username email"
      );
      if (orders) {
        res.status(200).json(orders);
      } else {
        res.status(501).json("không có đơn hàng");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
);
router.get("/api/mine", verifyToken, async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.send(orders);
});
router.get("/api/orders", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find().populate("user");
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
