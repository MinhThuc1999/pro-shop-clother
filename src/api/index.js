const express = require("express");
var cors = require("cors");

const mongoose = require("mongoose");
const user = require("./routes/user.route");
const product = require("./routes/product.route");
const order = require("./routes/order.route");
const cart = require("./routes/cart.router");
const uploadRouter = require("./routes/upload.router");
const stripeRouter = require("./routes/stripe.route");
const app = express();

app.use(cors({ origin: "*" }));
/*app.all("/", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});*/

mongoose
  .connect("mongodb://localhost:27017/clothershop")
  .then(() => {
    console.log("connet to DB success");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/", user);
app.use("/", product);
app.use("/", order);
app.use("/", cart);
app.use("/", uploadRouter);
app.use("/", stripeRouter);
app.listen(3001, () => console.log("connect succes on port 3001"));
