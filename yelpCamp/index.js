const express = require("express");
const engine = require("ejs-mate");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Campground = require("./models/campground");

mongoose
  .connect("mongodb://localhost:27017/yelp-camp")
  .then(() => console.log("We are a-live."))
  .catch((err) => console.error("Woopsie:", err));

mongoose.connection.on("error", (err) => console.error(err));
mongoose.connection.once("open", () => console.log("Database connected."));

const app = express();
const port = 3000;

app.engine("ejs", engine);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

app.get("/campgrounds/new", (req, res) => {
  res.render("campgrounds/new");
});

app.post("/campgrounds", async (req, res) => {
  const campground = new Campground(req.body.campground);
  await campground.save();
  res.redirect(`/campgrounds/${campground._id}`);
});

app.get("/campgrounds/:id/edit", async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  res.render("campgrounds/edit", { campground });
});

app.put("/campgrounds/:id", async (req, res) => {
  const campground = await Campground.findByIdAndUpdate(
    req.params.id,
    req.body.campground
  );
  res.redirect(`/campgrounds/${campground._id}`);
});

app.delete("/campgrounds/:id", async (req, res) => {
  const campground = await Campground.findByIdAndDelete(req.params.id);
  console.log(campground);
  res.redirect("/campgrounds");
});

app.get("/campgrounds/:id", async (req, res) => {
  const camp = await Campground.findById(req.params.id);
  res.render("campgrounds/details", { camp });
});

app.get("/campgrounds", async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("campgrounds/index", { campgrounds });
});

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log("Snooping on port", port);
});
