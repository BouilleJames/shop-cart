const fs = require("fs");
const path = require("path");

// const uuid = require("uuid");
const { v4: uuidv4 } = require("uuid");
const appDir = path.dirname(require.main.filename);

const p = path.join(appDir, "data", "products.json");

class Product {
  constructor(name, description, image, price) {
    this.name = name;
    this.description = description;
    this.image = image;
    this.price = price;
  }

  save(callback) {
    this.id = uuidv4();
    // Lire le fichier products.json
    // 1 option: le fichier existe déjà =>créer un tableau avec le contenu du fichier, ajouter le nouveau produit
    // 2 option: le fichier n'existe pas encore => créer un tableau avec le nouveau produit
    fs.readFile(p, (err, fileContent) => {
      let products = [];
      if (!err) {
        products = JSON.parse(fileContent);
      }

      products.push(this);

      fs.writeFile(p, JSON.stringify(products), (err) => {
        if (err) console.log(err);
        callback();
      });
    });
  }
  static findAll(callback) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        callback([]);
      } else {
        callback(JSON.parse(fileContent));
      }
    });
  }
}

module.exports = Product;
