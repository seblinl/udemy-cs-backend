const fs = require("fs");
const projectName = process.argv[2] || "Project";

try {
  fs.mkdirSync(projectName);
  fs.writeFile(`${projectName}/index.html`, "", (err) => {
    if (err) console.log(err);
  });
  fs.writeFile(`${projectName}/style.css`, "", (err) => {
    if (err) console.log(err);
  });
  fs.writeFile(`${projectName}/script.js`, "", (err) => {
    if (err) console.log(err);
  });
} catch (err) {
  console.log(err);
}
