const express = require("express");
const Joi = require("joi");
const Product = require("../models/product.model");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/api/product", verifyTokenAndAdmin, async (req, res) => {
  const { error } = validateProduct(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }

  const product = new Product(req.body);
  const result = await product.save();
  console.log(result);
  res.status(200).json(result);
});

router.get("/api/product/find/:id", async (req, res) => {
  const id = req.params.id;
  const result = await Product.find();
  const product = result.find((u) => u.id === id);

  if (!product) {
    return res.status(404).json({
      message: "Not Found product",
    });
  }

  try {
    return res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/api/products", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(2);
    } else if (qCategory) {
      products = await Product.find({
        category: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.put("/api/product/:id", verifyTokenAndAdmin, async (req, res) => {
  const id = req.params.id;
  const result = await Product.find();
  const product = result.find((u) => u.id === id);

  if (!product) {
    return res.status(404).json({
      message: "Not Found product",
    });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/api/product/:id", verifyTokenAndAdmin, async (req, res) => {
  const id = req.params.id;
  const result = await Product.find();
  const product = result.find((u) => u.id === id);

  if (!product) {
    return res.status(404).json({
      message: "Not Found product",
    });
  }

  try {
    await Product.findByIdAndDelete(id);
    return res.status(200).json("Product has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/api/product/categories", async (req, res) => {
  const categories = await Product.find().distinct("category");
  return res.json(categories);
});
const PAGE_SIZE = 3;
router.get("/api/product/search", async (req, res) => {
  const { query } = req;
  const pageSize = query.pageSize || PAGE_SIZE;
  const page = query.page || 1;
  const category = query.category || "";
  const price = query.price || "";
  const rating = query.rating || "";
  const order = query.order || "";
  const searchQuery = query.query || "";

  const queryFilter =
    searchQuery && searchQuery !== "all"
      ? {
          name: {
            $regex: searchQuery,
            $options: "i",
          },
        }
      : {};
  const categoryFilter = category && category !== "all" ? { category } : {};
  const ratingFilter =
    rating && rating !== "all"
      ? {
          rating: {
            $gte: Number(rating),
          },
        }
      : {};
  const priceFilter =
    price && price !== "all"
      ? {
          // 1-50
          price: {
            $gte: Number(price.split("-")[0]),
            $lte: Number(price.split("-")[1]),
          },
        }
      : {};
  const sortOrder =
    order === "featured"
      ? { featured: -1 }
      : order === "lowest"
      ? { price: 1 }
      : order === "highest"
      ? { price: -1 }
      : order === "toprated"
      ? { rating: -1 }
      : order === "newest"
      ? { createdAt: -1 }
      : { _id: -1 };

  const products = await Product.find({
    ...queryFilter,
    ...categoryFilter,
    ...priceFilter,
    ...ratingFilter,
  })
    .sort(sortOrder)
    .skip(pageSize * (page - 1))
    .limit(pageSize);

  const countProducts = await Product.countDocuments({
    ...queryFilter,
    ...categoryFilter,
    ...priceFilter,
    ...ratingFilter,
  });
  res.send({
    products,
    countProducts,
    page,
    pages: Math.ceil(countProducts / pageSize),
  });
});

const validateProduct = (product) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    desc: Joi.string().min(6).max(255),
    image: Joi.string().required(),
    category: Joi.string().required(),
    size: Joi.array().default(["S", "L", "XL"]),
    color: Joi.array(),
    price: Joi.number().required(),
    inStock: Joi.boolean().default(true),
  });
  return schema.validate(product);
};
module.exports = router;
