const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const user = require("./models/user");
const session = require("express-session");

const app = express();

mongoose
  .connect("mongodb://localhost:27017/authDemo")
  .then(() => console.log("Mongo online"))
  .catch((err) => {
    console.error("Mongo connection error");
    console.error(err);
  });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "clandestine",
    resave: false,
    saveUninitialized: true,
  })
);

const requireLogin = function (req, res, next) {
  if (!req.session.user_id) return res.redirect("/login");
  next();
};

app.get("/", (req, res) => {
  res.send("Homepage");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body.user;
  const user = new User({ username, password });
  await user.save();

  res.redirect("/login");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body.user;
  const user = await User.findAndAuthenicate(username, password);
  if (user) {
    req.session.user_id = user._id;
    return res.redirect("/secret");
  }
  res.redirect("/login");
});

app.post("/logout", (req, res) => {
  req.session.user_id = null;
  res.redirect("/");
});

app.get("/secret", requireLogin, (req, res) => {
  res.render("secret");
});

app.listen(3000, () => console.log("Upp and running on 3000"));
