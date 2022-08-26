import { franc } from "franc";
import langs from "langs";
import colors from "colors";

const textInput = process.argv[2];
const langCode = franc(textInput);
const language = langs.where("3", langCode);

if (langCode !== "und" && language) {
  console.log("Seems it's :", language.name.green);
} else console.log(`Sorry, don't know what ${langCode} is.`.red);
