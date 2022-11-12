const { client, uri } = require("../services/server");
const collection = client.db("myFirstDatabase").collection("users");
const usuarios = client.db("myFirstDatabase").collection("logins");
const Logins = require("../models/schema.logins");
const bcrypt = require("bcrypt");
const logger = require("../config/log4js");
const mongoose = require("mongoose");

const registrar = (input) => {
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
        return nUsuario.save().then((r) => console.log(r));
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
    .then((r) => {
      if (!r) {
        logger.info("Usuario no existente");
      } else {
      }
    })
    .catch((err) => logger.error(err));
};
module.exports = { registrar, login };
