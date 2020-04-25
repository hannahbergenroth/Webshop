const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
