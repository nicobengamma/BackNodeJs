const express = require("express");
const { Router } = express;
const routerUser = Router();
const { client, uri } = require("../services/server");
const { registrar, login } = require("../services/loginsService");

client.connect(() => {
  const collection = client.db("myFirstDatabase").collection("users");
  const usuarios = client.db("myFirstDatabase").collection("logins");
  routerUser.get("/", (req, res) => {
    res.send("ok");
  });
  routerUser.post("/registro", (req, res) => {
    const input = req.body;
    registrar(input, res);
    setTimeout(() => {
      collection.find({}).toArray((err, data) => {
        const productos = data;
        res.render("page.ejs", { productos });
      });
    }, 2000);
  });
  routerUser.post("/inicio", (req, res) => {
    const input = req.body;
    login(input);
    res.redirect("/api/products/admin");
  });
});
module.exports = routerUser;
