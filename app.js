const express = require("express");
const cookieParser = require("cookie-parser");
const routerCarrito = require("./routes/carrito.router");
const routerProducts = require("./routes/products.router");
const routerUser = require("./routes/user.router");
const routerInfo = require("./routes/info.router");
const routerRandoms = require("./routes/randoms.router");

const config = require("./config/config");

const app = express();
app.use(cookieParser());
// Middleware //

app.use(express.json());
app.use(express.urlencoded({ extended: "true" }));

// Routes //

app.use("/api/carrito", routerCarrito);
app.use("/api/products", routerProducts);
app.use("/api/user", routerUser);
app.use("/info", routerInfo);
app.use("/api/randoms", routerRandoms);
app.get("/", (req, res) => {
  res.send("ok");
});

// PORT //

app.listen(config.PORT, () => {
  console.log(`app listen on ${config.PORT}`);
});
