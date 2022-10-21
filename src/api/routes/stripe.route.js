const express = require("express");

const router = express.Router();

const stripe = require("stripe")(
  "sk_test_51LuSmgFM8EO2eXZPaSmKIafwuzsrmQcfqTl7RyjEj2JgIZ1Y9BAPFuWzGeqK8Xjl4SU5P8RdF80H57LLdKiyhPqH005xLYOqVs"
);

router.post("/api/payment/checkout", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "vnd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;
