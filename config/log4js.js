const log4js = require("log4js");

log4js.configure({
  appenders: {
    loggerRegistro: { type: "console" },
    loggerFile: { type: "file", filename: "info.log" },
    loggerFile2: { type: "file", filename: "info2.log" },
  },
  categories: {
    default: { appenders: ["loggerRegistro", "loggerFile"], level: "trace" },
  },
});

const logger = log4js.getLogger("default");

// logger.trace("hello");
// logger.debug("hello-debug");
// logger.info("es una info");
// logger.warn("es un warning");
// logger.error("error error");
// logger.fatal("se rompio todo");

module.exports = logger;
