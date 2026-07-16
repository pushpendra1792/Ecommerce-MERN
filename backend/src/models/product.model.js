const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  category: String,
  price: Number,
  image: String
})

const productModel = mongoose.model("products", productSchema);

module.exports = productModel;