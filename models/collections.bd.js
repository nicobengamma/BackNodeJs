const { client, uri } = require("../services/server");

const collection = client.db("myFirstDatabase").collection("users");
const collectionCarrito = client.db("myFirstDatabase").collection("carts");

module.exports = { collection, collectionCarrito };
