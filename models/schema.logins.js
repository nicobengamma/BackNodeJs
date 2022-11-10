const mongoose = require("mongoose");

const login = mongoose.model("logins", {
  usuario: String,
  password: String,
});

module.exports = login;
