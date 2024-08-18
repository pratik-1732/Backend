import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
var First = "";
var Last = "";
var len = 0;
app.use(bodyParser.urlencoded({ extended: true }));

function inputs(req, res, next) {
  First = req.body["fName"];
  Last = req.body["lName"];
  next();
}
app.use(inputs);

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", (req, res) => {
  len = First.length + Last.length;
  res.render("index.ejs", {letters: len});
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
