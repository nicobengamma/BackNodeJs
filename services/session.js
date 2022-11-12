const express = require("express");
const session = require("express-session");
const sessionFile = require("session-file-store");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");

const app = express();

app.use(cookieParser());
app.use(
  session({
    store: new MongoStore({
      mongoUrl:
        "mongodb+srv://admin:C1NjOPb3tidC56qN@cluster0.uo708jn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      advancedOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
    secret: "orwell",
    resave: false,
    saveUninitialized: true,
  })
);

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}
