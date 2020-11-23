console.log("Product Model");

const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "product name is required"],
      minlength: [3, "Name must be 3 characters or longer"],
    },
    type: {
      type: String,
      required: [true, "product type is required"],
      minlength: [3, "Type must be 3 characters or longer"],
    },
    description: {
      type: String,
      required: [true, "Description name is required"],
      minlength: [3, "Description must be 3 characters or longer"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      minlength: [3, "Quantity must greater than 0"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
