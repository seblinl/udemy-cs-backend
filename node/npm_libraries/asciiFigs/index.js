const figlet = require("figlet");
const colors = require("colors");

figlet("Futurama", function (err, data) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(data.rainbow);
});
