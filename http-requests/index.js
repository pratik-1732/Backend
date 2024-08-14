import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello Guys...");
});
app.get("/about", (req, res) => {
  res.send(
    "My name is Pratik. <br> <h3>I am pursuing bachelor of technology in mineral and metallury from IIT Dhanbad</h3>"
  );
});
app.get("/contact", (req, res) => {
  res.send("mail- addfsdf@fkjsf.com");
});
app.listen(port, () => {
  console.log(`server is runnig on port ${port}...`);
});
