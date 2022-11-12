const mongoose = require("mongoose");

const login = mongoose.model("logins", {
  usuario: String,
  password: String,
  token: String,
});

module.exports = login;
