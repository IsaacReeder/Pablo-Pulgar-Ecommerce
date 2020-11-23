console.log("Product Routes");

const Product = require("../controllers/Product.controller");

module.exports = (app) => {
  app.get("/api/product", Product.getAll);
  app.post("/api/product/new", Product.create);
  app.get("/api/product/:_id", Product.getOne);
  app.put("/api/product/update/:_id", Product.update);
  app.delete("/api/product/delete/:_id", Product.delete);
};
