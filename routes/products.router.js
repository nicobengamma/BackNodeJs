const express = require("express");
const { Router } = express;
const routerProducts = Router();

//-----------------//

const log4js = require("log4js");
const typeLogg = process.env.NODE_ENV == "Production" ? "prod" : "consola";
const logger = log4js.getLogger(typeLogg);

//-----------------//

const { guardar, actualizar, eliminar } = require("../services/productService");
const { client } = require("../services/server");
const Users = require("../models/schema.users");
const { collection } = require("../models/collections.bd");

client.connect((err) => {
  routerProducts.get("/", (req, res) => {
    collection.find({}).toArray((err, data) => {
      if (err) {
        logger.error(err);
        return res.sendStatus(500);
      }
      const productos = data;
      res.render("page.ejs", { productos });
    });
  });
  routerProducts.get("/admin", (req, res) => {
    collection.find({}).toArray((err, data) => {
      if (err) {
        logger.error(err);
        return res.sendStatus(500);
      }
      const productos = data;
      res.render("admin.ejs", { productos });
    });
  });
  routerProducts.get("/:id", (req, res) => {
    const id = req.params.id;
    collection.find({ id: id }).toArray((err, data) => {
      if (err) {
        logger.error(err);
        return res.sendStatus(500);
      }
      const productos = data;
      res.render("page.ejs", { productos });
    });
  });
  routerProducts.post("/addProd", (req, res) => {
    const prods = req.body;
    guardar(prods);
    setTimeout(() => {
      collection.find({}).toArray((err, data) => {
        const productos = data;
        res.render("page.ejs", { productos });
      });
    }, 2000);
  });
  routerProducts.post("/actualizarProd", (req, res) => {
    const prods = req.body;
    actualizar(prods);
    setTimeout(() => {
      collection.find({}).toArray((err, data) => {
        const productos = data;
        res.render("page.ejs", { productos });
      });
    }, 2000);
  });
  routerProducts.post("/eliminarProd", (req, res) => {
    const prods = req.body;
    eliminar(prods);
    setTimeout(() => {
      collection.find({}).toArray((err, data) => {
        const productos = data;
        res.render("page.ejs", { productos });
      });
    }, 2000);
  });
});

module.exports = routerProducts;
