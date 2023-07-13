// 1page d'accueil, 1 page produit, 1 page panier, 1 page admin
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "pug");

app.use(bodyParser.urlencoded({ extended: false }));

// Routes
const shopRoutes = require("./routes/shop");
app.use("/", shopRoutes);
const adminRoutes = require("./routes/admin");
app.use("/admin", adminRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
