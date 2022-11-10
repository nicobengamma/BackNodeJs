const express = require("express");
const { Router } = express;
const routerCarrito = Router();
const { Users, Carrito, Carts, addCart } = require("../models/schema.users");
const { client, uri } = require("../services/server");
const { collection, collectionCarrito } = require("../models/collections.bd");

//--- JHASDQPLMCN ----//

client.connect((err) => {
  routerCarrito.post("/addCarrito", (req, res) => {
    collection.find({}).toArray((err, data) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      const productos = data;
      const total = productos.length;
      const { id } = req.body;
      if (id <= total) {
        Users.find({ id: id }, function (err, docs) {
          if (err) {
            console.log(err);
          }
          console.log(docs[0].name);
          addCart.save().then(() => {
            console.log("Se agrego al carrito");
          });
          setTimeout(() => {
            res.redirect("/api/carrito/Products");
          }, 2000);
        });
      }
    });
  });
  routerCarrito.post("/eliminarProd", (req, res) => {
    const { id } = req.body;
    collectionCarrito.find({}).toArray((err, data) => {
      if (err) {
        console.log(err);
      }
      const prodInCart = data;
      const total = prodInCart.length;
      if (id) {
        Carts.findOneAndDelete({ id: id }, (err, docs) => {
          if (err) {
            console.log(err);
          }
          console.log(docs);
        });
        setTimeout(() => {
          res.redirect("/api/carrito/Products");
        }, 3000);
      }
    });
  });

  routerCarrito.get("/products", (req, res) => {
    collectionCarrito.find({}).toArray((err, data) => {
      const productos = data;
      res.render("carrito.ejs", { productos });
    });
  });

  routerCarrito.post("/:id/products", (req, res) => {
    const total = productos.length;
    const { id } = req.params;
    if (id <= total) {
      function productById(id) {
        const data = productos;
        const respuesta = data.find((res) => res.id == id);
        return respuesta;
      }
      const pepe = productById(id);
      carrito.push(pepe);
      fs.writeFileSync(
        "carrito/carrito.json",
        JSON.stringify(carrito),
        "utf-8"
      );
      res.send(carrito);
    } else {
      res.send("Ese producto no existe");
    }
  });

  routerCarrito.delete("/:id/products/:id_prod", (req, res) => {
    const { id_prod } = req.params;
    carrito.forEach((e, i) => {
      if (e.idCarrito == id_prod) {
        carrito.splice(i, 1);
      }
    });
    fs.writeFileSync("carrito/carrito.json", JSON.stringify(carrito), "utf-8");
    res.send(carrito);
  });
});

module.exports = routerCarrito;
