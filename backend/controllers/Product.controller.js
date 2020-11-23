console.log("product.controller.js");

const Product = require("../models/product.model");
// const { findById } = require("../models/product.model");

class ProductController {
  create(req, res) {
    const newProduct = new Product(req.body);
    newProduct
      .save()
      .then(() => res.json)
      .catch((errors) => res.json(errors));
  }
  getAll(req, res) {
    Product.find()
      .sort("type")
      .then((product) => res.json(product))
      .catch((errors) => res.json(errors));
  }
  getOne(req, res) {
    Product.findOne({ _id: req.params._id })
      .then((product) => res.json(product))
      .catch((errors) => res.json(errors));
  }
  update(req, res) {
    Product.findByIdAndUpdate({ _id: req.params._id }, req.body, {
      runValidators: true,
    })
      .then(() => res.json({ msg: "ok" }))
      .catch((errors) => res.json(errors));
  }
  delete(req, res) {
    Product.findByIdAndDelete({ _id: req.params._id })
      .then(() =>
        res.json({
          msg: "ok",
        })
      )
      .catch((errors) => res.json(errors));
  }
}
module.exports = new ProductController();
