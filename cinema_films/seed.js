const mongoose = require("mongoose");
const Film = require("./models/film");

mongoose
  .connect("mongodb://localhost:27017/films_db")
  .then(() => console.log("Mongoose online."))
  .catch((err) => console.error("Woops:", err));

const seedFilms = [
  {
    title: "Two Popes",
    release: 2019,
    director: "Fernando Meirelles",
    rottenScore: 89,
    genre: "Drama",
  },
  {
    title: "Lady Bird",
    release: 2017,
    director: "Greta Gerwig",
    rottenScore: 99,
    genre: "Comedy",
  },
];

// Film.insertMany(seedFilms)
//   .then((res) => console.log(res))
//   .catch((err) => console.error(err));

const darkKnight = new Film({
  title: "The Dark Knight",
  release: 2008,
  director: "Christopher Nolan",
  rottenScore: 94,
  genre: "Action",
});

// darkKnight
//   .save()
//   .then((f) => console.log(f))
//   .catch((err) => console.error(err));
