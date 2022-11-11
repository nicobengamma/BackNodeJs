const log4js = require("log4js");
const typeLogg = process.env.NODE_ENV == "Production" ? "prod" : "consola";
const logger = log4js.getLogger(typeLogg);

module.exports = logger;
