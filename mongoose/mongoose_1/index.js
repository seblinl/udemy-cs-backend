const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/films_DB")
  .then(() => console.log("Connected"))
  .catch((err) => console.error("Eror:", err));

const filmsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  release: { type: Number },
  director: String,
  rottenScore: Number,
});

filmsSchema.virtual("titleRelease").get(function () {
  return `${this.title} (${this.release})`;
});

filmsSchema.methods.printFilm = function () {
  console.log(this.titleRelease, this.director, this.rottenScore);
};

const Film = mongoose.model("Film", filmsSchema);

const findFilm = async (name) => {
  const foundFilm = await Film.findOne({ title: name });
  foundFilm.printFilm();
};

findFilm("The Two Popes");

// const dancerInTheDark = new Film({
//   title: "Dancer in the Dark",
//   release: 2000,
//   director: "Lars von Trier",
//   rottenScore: 69,
// });

// dancerInTheDark.save();

// Film.insertMany([
//   {
//     title: "The Dark Knight",
//     release: 2008,
//     director: "Christopher Nolan",
//     rottenScore: 94,
//   },
//   {
//     title: "The Two Popes",
//     release: 2019,
//     director: "Fernando Meirelles",
//     rottenScore: 89,
//   },
//   {
//     title: "City of God",
//     release: 2002,
//     director: "Fernando Meirelles",
//     rottenScore: 91,
//   },
//   {
//     title: "Lady Bird",
//     release: 2017,
//     director: "Greta Gerwig",
//     rottenScore: 99,
//   },
// ]).then((data) => console.log("Sent:", data));
