const mongoose = require("mongoose");
const { Film } = require("./film");
const { Schema } = mongoose;

const cinemaSchema = new Schema({
  name: {
    type: String,
    required: [true, "Need to supply a name."],
  },
  location: {
    type: String,
  },
  website: {
    type: String,
  },
  films: [
    {
      type: Schema.Types.ObjectId,
      ref: "Film",
    },
  ],
});

cinemaSchema.post("findOneAndDelete", async function (cinema) {
  if (cinema.films.length) {
    const deletetionResults = await Film.deleteMany({
      _id: { $in: cinema.films },
    });
    console.log(deletetionResults);
  }
});

const Cinema = mongoose.model("Cinema", cinemaSchema);

module.exports = Cinema;
