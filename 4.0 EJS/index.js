import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  var date = new Date();
  var day = date.getDay();
  console.log(day);

  var condition = "";
  var msg = "";

  if (day == 0 || day == 1) {
    condition = "Weekend";
    msg = "time to have some fun...";
  } else {
    condition = "Weekday";
    msg = "time to work hard...";
  }
  res.render("index.ejs", {
    condition: condition,
    msg: msg,
  });
});
app.listen(port, () => {
  console.log("server is running...");
});
