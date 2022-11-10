const express = require("express");
const { Router } = express;
const routerUser = Router();
const mongoose = require("mongoose");
const { client, uri } = require("../services/server");
const Logins = require("../models/schema.logins");
const bcrypt = require("bcrypt");
const logger = require("../config/log4js");

client.connect(() => {
  const collection = client.db("myFirstDatabase").collection("users");
  const usuarios = client.db("myFirstDatabase").collection("logins");
  routerUser.get("/", (req, res) => {
    res.send("ok");
  });
  routerUser.post("/registro", (req, res) => {
    const { usuario, password } = req.body;
    usuarios.findOne({ usuario: usuario }).then((r) => {
      if (!r) {
        mongoose.connect(uri, {}, (err) => {
          if (err) {
            logger.warn(err);
          }
        });
        bcrypt.hash(password, 12).then(function (hashedPassword) {
          const nUsuario = new Logins({
            usuario: usuario,
            password: hashedPassword,
          });
          return nUsuario.save().then((r) => console.log(r));
        });
        setTimeout(() => {
          collection.find({}).toArray((err, data) => {
            const productos = data;
            res.render("page.ejs", { productos });
          });
        }, 2000);
      } else {
        res.send("<h1>El Usuario Ya existe, Intente con otro !</h1>");
      }
    });
  });
  routerUser.post("/inicio", (req, res) => {
    const { usuario, password } = req.body;
    usuarios
      .findOne({ usuario: usuario })
      .then((r) => {
        if (r) {
          mongoose.connect(uri, {}, (error) => {
            if (error) {
              console.log(error);
            }
          });
          return bcrypt.compare(password, r.password);
        }
      })
      .then((r) => {
        if (!r) {
          logger.info("Usuario no existente");
          res.send("El usuario no existe en nuestra base de datos");
        }
        res.redirect("/api/products/admin");
      })
      .catch((err) => logger.error(err));
  });
});

module.exports = routerUser;
