const { collection, collectionCarrito } = require("../models/collections.bd");
const { Users, Carrito } = require("../models/schema.users");

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
        const newProdCart = new Carrito({
          id: id,
          name: docs[0].name,
          descripcion: docs[0].descripcion,
          codigo: docs[0].codigo,
          price: docs[0].price,
          stock: docs[0].stock,
          url: docs[0].url,
        });
        newProdCart.save().then(() => {
          console.log("Se agrego al carrito");
        });
      });
    }
  });

const eliminarProd = (id) => {
  collectionCarrito.find({}).toArray((err, data) => {
    if (err) {
      console.log(err);
    }
    const prodInCart = data;
    const total = prodInCart.length;
    if (id >= total) {
      Carrito.findOneAndDelete({ id: id }, (err, docs) => {
        if (err) {
          console.log(err);
        }
        console.log(`delete: ${docs}`);
      });
    }
  });
};

module.exports = { addCarrito, eliminarProd };
