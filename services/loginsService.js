const { client, uri } = require("../services/server");
const usuarios = client.db("myFirstDatabase").collection("logins");
const Logins = require("../models/schema.logins");
const bcrypt = require("bcrypt");
const logger = require("../config/log4js");
const mongoose = require("mongoose");
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const jwt = require("jsonwebtoken");

const registrar = (input, res) => {
  const { usuario, password } = input;
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
        nUsuario.save().then((r) => console.log(r));
        const token = jwt.sign({ id: usuario }, "Tok3n", {
          expiresIn: 5,
        });
        return res.cookie({ token: token });
      });
    } else {
      res.send("<h1>El Usuario Ya existe, Intente con otro !</h1>");
    }
  });
};
const login = (input) => {
  const { usuario, password } = input;
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
    .then((r, res) => {
      if (r) {
        session({
          store: new MongoStore({
            mongoUrl:
              "mongodb+srv://admin:C1NjOPb3tidC56qN@cluster0.uo708jn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
            advancedOptions: {
              useNewUrlParser: true,
              useUnifiedTopology: true,
            },
          }),
          secret: "orwell",
          resave: false,
          saveUninitialized: true,
        });
        next();
      } else {
        logger.info("Usuario no existente");
      }
    })
    .catch((err) => logger.error(err));
};
module.exports = { registrar, login };
