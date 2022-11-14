const { client, uri } = require("../services/server");
const usuarios = client.db("myFirstDatabase").collection("logins");
const Logins = require("../models/schema.logins");
const bcrypt = require("bcrypt");
const logger = require("../config/log4js");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

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
        res.send("Bienvenido");
      });
    } else {
      res.send("<h1>El Usuario Ya existe, Intente con otro !</h1>");
    }
  });
};
const login = (input, res) => {
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
    .then((r) => {
      const token = jwt.sign(
        {
          name: usuario.name,
        },
        config.TOKEN_SECRET
      );
      res.cookie("auth", token);
    })
    .catch((err) => logger.error(err));
};
module.exports = { registrar, login };
