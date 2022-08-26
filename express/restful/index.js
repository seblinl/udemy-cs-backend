const express = require("express");
const methodOverride = require("method-override");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require("uuid");

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

const comments = [
  {
    id: uuidv4(),
    username: "Panzer",
    comment: "Need it like a tank shell to the head.",
  },
  {
    id: uuidv4(),
    username: "Zerks",
    comment: "Aargh, pummeled be thee.",
  },
  {
    id: uuidv4(),
    username: "Brutoz",
    comment: "Tiz, but a smackdown.",
  },
  {
    id: uuidv4(),
    username: "Conquestos",
    comment: "Unto thee, defeat I dispense.",
  },
];

app.get("/comments", (req, res) => {
  res.render("comments/index", { comments });
});

app.get("/comments/new", (req, res) => {
  res.render("comments/new");
});

app.post("/comments", (req, res) => {
  const { username, comment } = req.body;
  comments.push({ username, comment, id: uuidv4() });
  res.redirect("/comments");
});

app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/show", { ...comment });
});

app.get("/comments/:id/edit", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/edit", { ...comment });
});

app.patch("/comments/:id", (req, res) => {
  const { id } = req.params;
  const newComment = req.body.newComment;
  const comment = comments.find((c) => c.id === id);
  comment.comment = newComment;
  res.redirect("/comments");
});

app.delete("/comments/:id", (req, res) => {
  const { id } = req.params;
  const commentIndex = comments.indexOf(id);
  comments.splice(commentIndex, 1);
  res.redirect("/comments");
});

app.listen(3000, () => {
  console.log("No REST for the...");
});
