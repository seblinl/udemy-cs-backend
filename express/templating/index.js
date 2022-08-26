const express = require("express");
const app = express();
const path = require("path");
const redditData = require("./data.json");
console.log(__dirname);

app.use(express.static(path.join(__dirname, "/public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  const rand = Math.floor(Math.random() * 7) + 1;
  res.render("home", { random: rand });
});

app.get("/films", (req, res) => {
  const films = [
    "The Dark Knight",
    "City of God",
    "The Two Popes",
    "Sicario",
    "The Power of the Dog",
  ];
  res.render("films", { films });
});

app.get("/r/:subreddit", (req, res) => {
  const { subreddit } = req.params;
  const data = redditData[subreddit];
  if (data) {
    res.render("subreddit", { ...data });
  } else {
    res.render("notfound", { subreddit });
  }
});

app.listen(3000, () => console.log("Listening, intently."));
