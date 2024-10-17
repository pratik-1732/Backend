import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "secrets",
  password: "postgre@123",
  port: "5432",
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
  try {
    const data = await db.query("SELECT * FROM users WHERE username= $1", [
      email,
    ]);
    if (data.rows > 0) {
      res.send("user already exists...");
    } else {
      const response = await db.query(
        "INSERT INTO users (username, password) VALUES ($1, $2)",
        [email, password]
      );
      // console.log(response);
      res.render("secrets.ejs");
    }
  } catch (err) {
    console.error(err);
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
  try {
    const data = await db.query("SELECT * FROM users WHERE username= $1", [
      email,
    ]);
    if (data.rows == 0) {
      res.send("user does not exist...");
    } else {
      if (data.rows[0].password == password) {
        res.render("secrets.ejs");
      } else {
        res.send("wrong password...");
      }
    }
  } catch (err) {
    console.error(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
