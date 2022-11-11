const { collection } = require("../models/collections.bd");
const { client } = require("../services/server");
const { Users } = require("../models/schema.users");

const guardar = (prods) =>
  client.connect((err) => {
    collection.find({}).toArray((err, data) => {
      if (err) {
        logger.error(err);
        return res.sendStatus(500);
      }
      const productosBefore = data;
      const { name, price, url } = prods;
      if (name && price && url) {
        const id = productosBefore.length + 1;
        const nuevoUsuario = new Users({
          id: id,
          name: prods.name,
          descripcion: prods.descripcion,
          codigo: prods.codigo,
          price: prods.price,
          stock: prods.stock,
          url: prods.url,
        });
        nuevoUsuario.save().then(() => console.log("dato guardado"));
      }
    });
  });
const actualizar = (prods) => {
  const { name, price, url, id, descripcion, codigo, stock } = prods;
  if (name && price && url && id && descripcion && codigo && stock) {
    Users.findOneAndUpdate(
      { id: id },
      {
        name: prods.name,
        descripcion: prods.descripcion,
        codigo: prods.codigo,
        price: prods.price,
        stock: prods.stock,
        url: prods.url,
      },
      function (err, docs) {
        if (err) {
          logger.error(err);
        }
      }
    );
    console.log("Producto Actualizado");
  }
};
const eliminar = (prods) => {
  collection.find({}).toArray((err, data) => {
    if (err) {
      logger.error(err);
      return res.sendStatus(500);
    }
    const productos = data;
    const total = productos.length;
    const { id } = prods;
    if (id <= total) {
      Users.findOneAndRemove({ id: id }, function (err, docs) {
        if (err) {
          logger.error(err);
        } else {
          console.log("Removed User : ", docs);
        }
      });
    }
  });
};
module.exports = { guardar, actualizar, eliminar };
