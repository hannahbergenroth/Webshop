const router = require("express").Router();
let Image = require("../models/image.model");

router.post("/upload", async (req, res) => {
  try {
    const newImage = new Image({
      imageUrl: req.body.imageUrl,
    });
    await newImage.save();
    res.json(newImage.imageUrl);
  } catch (err) {
    console.error("Something went wrong", err);
  }
});

module.exports = router;
