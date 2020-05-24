const router = require("express").Router();
let Product = require("../models/product.model");
const validateCreateProduct = require("../validation/create-product");

router.route("/").get((req, res) => {
  Product.find()
    .then((products) => res.json(products))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const { errors, isValid } = validateCreateProduct(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const name = req.body.name;
  const description = req.body.description;
  const price = Number(req.body.price);
  const imageUrl = req.body.imageUrl;

  const newProduct = new Product({ name, description, price, imageUrl });

  newProduct
    .save()
    .then(() => res.json("Product added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:query").get((req, res) => {
  var searchQuery = {};
  searchQuery.name = { $regex: req.params.query, $options: "i" };
  Product.find(searchQuery, function (error, product) {
    if (error || product === null) {
      return res.status(500).send(error);
    }
    return res.status(200).send(product);
  });
});

router.route("/:id").delete((req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then(() => res.json("Product deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
