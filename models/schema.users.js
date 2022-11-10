const mongoose = require("mongoose");

const Users = mongoose.model("users", {
  id: Number,
  name: String,
  descripcion: String,
  codigo: Number,
  price: Number,
  stock: Number,
  url: String,
});
const Carrito = mongoose.model("cart", {
  id: Number,
  name: String,
  descripcion: String,
  codigo: Number,
  price: Number,
  stock: Number,
  url: String,
});
const Carts = mongoose.model("carts", {
  id: Number,
  name: String,
  descripcion: String,
  codigo: Number,
  price: Number,
  stock: Number,
  url: String,
});

module.exports = { Users, Carrito, Carts };
