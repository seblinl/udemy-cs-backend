const express = require("express");
const app = express();

// app.use((req, res) => {
//   console.log("Request gotten.");
// });

app.get("/", (req, res) => {
  res.send("<h1>Home</h1>");
});
app.get("/contacts", (req, res) => {
  res.send("<h1>Contacts</h1>");
});
app.get("/about", (req, res) => {
  res.send("<h1>About</h1>");
});
app.get("/r/:subreddit", (req, res) => {
  const { subreddit } = req.params;
  res.send(`You'll probably find ${subreddit} on reddit.`);
});
app.get("/*", (req, res) => {
  res.send("A most peculiar request.");
});

app.listen(3000, () => {
  console.log("Shush, trying to listen.");
});
