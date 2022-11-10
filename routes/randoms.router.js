const express = require("express");
const { Router } = express;
const routerRandoms = Router();

routerRandoms.get("/", (req, res) => {
  const h = req.query;
  const number = h.cant;
  const calculo = number * Math.floor(Math.random() * 100);

  res.send({ calculo });
});

module.exports = routerRandoms;
