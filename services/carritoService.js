const { collection, collectionCarrito } = require("../models/collections.bd");
const { Carts } = require("../models/schema.users");

const addCarrito = (prod) =>
  collection.find({}).toArray((err, data) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    const productos = data;
    const total = productos.length;
    const { id } = prod;
    if (id <= total) {
      Users.find({ id: id }, function (err, docs) {
        if (err) {
          console.log(err);
        }
        addCart.save().then(() => {
          console.log("Se agrego al carrito");
        });
      });
    }
  });
