const Product = require("../models/Product");

const getIndex = (req, res) => {
  Product.findAll((products) => {
    console.log(products);
    res.render("index", {
      title: "Accueil",
      path: "/",
      products: products,
    });
  });
};

const getCart = (req, res) => {
  res.render("cart", {
    title: "Panier",
    path: "/panier",
  });
};

module.exports = {
  getIndex: getIndex,
  getCart: getCart,
};
