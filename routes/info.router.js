const express = require("express");
const { Router } = express;
const routerInfo = Router();

routerInfo.get("/", (req, res) => {
  res.send({
    "ARGUMENTOS DE ENTRADA": process.argv[0],
    "NOMBRE DE LA PLATAFORMA": process.platform,
    "VERSION DE NODE": process.version,
    "MEMORIA TOTAL RESERVADA": process.memoryUsage().rss,
    "PATH DE EJECUSION": process.execPath,
    "ID DEL PROCESO": process.pid,
    "DIRECTORIO ACTUAL": process.cwd(),
  });
});

module.exports = routerInfo;
