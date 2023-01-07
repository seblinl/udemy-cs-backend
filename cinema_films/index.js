const express = require("express");
const methodOverride = require("method-override");
const path = require("path");
const mongoose = require("mongoose");
const ObjectID = require("mongoose").Types.ObjectId;
const { Film, genres } = require("./models/film");
const Cinema = require("./models/cinema");
const AppError = require("./AppError");
const { findByIdAndDelete } = require("./models/cinema");

const app = express();
const port = 3000;

mongoose
  .connect("mongodb://localhost:27017/cinema_showings")
  .then(() => console.log("Mongoose online."))
  .catch((err) => console.error("Woops:", err));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const wrapAsync = (fn) => {
  return function (req, res, next) {
    fn(req, res, next).catch((err) => next(err));
  };
};

// Cinema Routes
app.get("/cinemas/new", (req, res) => {
  res.render("cinemas/new");
});

app.post(
  "/cinemas",
  wrapAsync(async (req, res, next) => {
    const cinema = new Cinema(req.body);
    await cinema.save();
    res.redirect("/cinemas");
  })
);

app.get(
  "/cinemas/:id/films/new",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const cinema = await Cinema.findById(id);
    res.render("films/new", { cinema, genres });
  })
);

app.post(
  "/cinemas/:id/films",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const cinema = await Cinema.findById(id);
    const film = new Film(req.body);
    cinema.films.push(film);
    film.cinemas.push(cinema);
    await cinema.save();
    await film.save();
    res.redirect("/cinemas/" + id);
  })
);

app.get(
  "/cinemas/:id",
  wrapAsync(async (req, res, next) => {
    const cinema = await Cinema.findById(req.params.id).populate("films");
    res.render("cinemas/details", { cinema });
  })
);

app.delete(
  "/cinemas/:id",
  wrapAsync(async (req, res, next) => {
    const cinema = await Cinema.findByIdAndDelete(req.params.id);
    res.redirect("/cinemas");
  })
);

app.get(
  "/cinemas",
  wrapAsync(async (req, res, next) => {
    const cinemas = await Cinema.find({});
    res.render("cinemas/index", { cinemas });
  })
);

// Film Routes
app.post(
  "/films",
  wrapAsync(async (req, res, next) => {
    const newFilm = new Film(req.body);
    await newFilm.save();
    console.log(newFilm);
    res.redirect(`/films/${newFilm._id}`);
  })
);

app.put(
  "/films/:id",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const film = await Film.findByIdAndUpdate(id, req.body, {
      runValidators: true,
    });
    res.redirect(`/films/${film._id}`);
  })
);

app.delete(
  "/films/:id",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const removedFilm = await Film.findByIdAndDelete(id);
    console.log("Deleted:", removedFilm);
    res.redirect("/films");
  })
);

app.get("/films/new", (req, res) => {
  res.render("films/new", { genres });
});

app.get(
  "/films/:id/edit",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    if (!ObjectID.isValid(id)) {
      throw new AppError(401, "Invalid ID.");
    }

    const film = await Film.findById(id);
    if (!film) {
      throw new AppError(404, "Can't find the film.");
    }

    res.render("films/edit", { film, genres });
  })
);

app.get(
  "/films/:id",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    if (!ObjectID.isValid(id)) {
      throw new AppError(401, "Invalid ID.");
    }

    const film = await Film.findById(id).populate("cinemas");
    if (!film) {
      throw new AppError(404, "Can't find the film.");
    }

    res.render("films/details", { film });
  })
);

app.get(
  "/films",
  wrapAsync(async (req, res, next) => {
    const { genre } = req.query;
    const films = await Film.find(genre ? { genre } : {});
    res.render("films/index", { films, genre: genre ? genre : "All" });
  })
);

// General Routes
app.get("/", (req, res) => {
  res.render("index");
});

//Error handling middleware
app.use((err, req, res, next) => {
  const { status = 500, message = "Error, boy.", name = "Error:" } = err;
  res.status(status).send(`${name}: ${message}`);
});

app.listen(port, () => console.log("Snooping on", port));
