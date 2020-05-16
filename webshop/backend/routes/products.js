const router = require("express").Router();
let Product = require("../models/product.model");
const validateCreateProduct = require("../validation/create-product");

router.route("/").get((req, res) => {
  const pageOptions = {
    page: parseInt(req.query.page, 10) || 0,
    limit: parseInt(req.query.limit, 10) || 5,
  };

  Product.find()
    //.skip(pageOptions.page * pageOptions.limit)
    //.limit(pageOptions.limit)
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

router.route("/:id").get((req, res) => {
  Product.findById(req.params.id)
    .then((product) => res.json(product))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then(() => res.json("Product deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
