const mongoose = require("mongoose");
const { Schema } = mongoose;

const genres = ["Action", "Drama", "Comedy", "Thriller"];

const filmSchema = new Schema({
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
  cinemas: [
    {
      type: Schema.Types.ObjectId,
      ref: "Cinema",
    },
  ],
});

const Film = mongoose.model("Film", filmSchema);

module.exports = { Film, genres };
