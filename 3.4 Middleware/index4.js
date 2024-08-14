import express from "express";
import bodyParser from "body-parser";

import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
// var output = "";
var street = "";
var pet = "";
app.use(bodyParser.urlencoded({ extended: true }));

function bandName(req, res, next) {
  // const data = req.body;
  street = req.body["street"];
  pet = req.body["pet"];
  // output = req.body["street"] + req.body["pet"];
  // console.log(street);
  next();
}
app.use(bandName);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res) => {
  // const data = req.body;
  // // console.log("name: ", data.street);
  // // console.log("pet: ", data.pet);
  // res.send(`street name: ${data.street} and pet name: ${data.pet}..`);
  // res.send(`<h1> your band name </h1> <br> <h4>${output} Rocks....</h4>`);
  res.send(
    `<h1> your band name </h1> <br> <h4>${street} ${pet} Rocks....</h4>`
  );
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
