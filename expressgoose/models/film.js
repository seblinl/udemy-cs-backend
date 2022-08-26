const mongoose = require("mongoose");

const genres = ["Action", "Drama", "Comedy"];

const filmSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  release: {
    type: Number,
    min: 0,
  },
  director: {
    type: String,
  },
  rottenScore: {
    type: Number,
    min: 0,
  },
  genre: {
    type: String,
    enum: genres,
  },
});

const Film = mongoose.model("Film", filmSchema);
module.exports = { Film, genres };
