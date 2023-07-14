const fs = require("fs");
const path = require("path");

const { v4: uuidv4 } = require("uuid");
const appDir = path.dirname(require.main.filename);

const p = path.join(appDir, "data", "products.json");

const getProductsFromFile = (callback) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      callback([]);
    } else {
      callback(JSON.parse(fileContent));
    }
  });
};

class Product {
  constructor(name, description, image, price) {
    this.name = name;
    this.description = description;
    this.image = image;
    this.price = price;
  }

  save(callback) {
    this.id = uuidv4();

    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        if (err) console.log(err);
        callback();
      });
    });
  }
  static findAll(callback) {
    getProductsFromFile((products) => {
      callback(products);
    });
  }
  static findById(id, callback) {
    getProductsFromFile((products) => {
      const product = products.find((prod) => prod.id === id);
      callback(product);
    });
  }
}

module.exports = Product;
