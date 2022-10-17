const express = require("express");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const multer = require("multer");
const { verifyTokenAndAdmin } = require("../middlewares/auth.middleware");

const router = express.Router();

const upload = multer();

router.post(
  "/api/product/upload",

  upload.single("file"),
  async (req, res) => {
    cloudinary.config({
      cloud_name: "dgnxqygxv",
      api_key: "283221991413727",
      api_secret: "Z_4coMWHFIuewUk7kGZhP3ET_Ic",
    });
    const streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };
    const result = await streamUpload(req);
    res.json(result);
  }
);

module.exports = router;
