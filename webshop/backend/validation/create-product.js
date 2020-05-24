const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateCreateProduct(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.price = !isEmpty(data.price) ? data.price : "";
  data.imageUrl = !isEmpty(data.imageUrl) ? data.imageUrl : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Title field is required";
  }

  if (Validator.isEmpty(data.price)) {
    errors.price = "Price field is required";
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = "Description field is required";
  }

  if (Validator.isEmpty(data.imageUrl)) {
    errors.imageUrl = "Image is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
