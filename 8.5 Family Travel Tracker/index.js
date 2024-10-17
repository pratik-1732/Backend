import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "postgre@123",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

let users = [
  { id: 1, name: "Angela", color: "teal" },
  { id: 2, name: "Jack", color: "powderblue" },
];

async function checkVisisted() {
  const result = await db.query(
    "SELECT country_code FROM visited_countries WHERE user_id= $1",
    [user_id]
  );
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}
let reqColor;
app.get("/", async (req, res) => {
  const countries = await checkVisisted();

  reqColor = await db.query("SELECT color from users WHERE id= $1", [user_id]);
  const outputColor = reqColor.rows[0];
  // console.log(outputColor);
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: outputColor.color,
  });
});
app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code) VALUES ($1)",
        [countryCode]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});
let user_id;
app.post("/user", async (req, res) => {
  user_id = req.body["user"];
  // console.log(user_id);
  // const user_result = await db.query("SELECT * FROM users WHERE id= $1", [
  //   user_id,
  // ]);
  const user_result = await db.query("SELECT * FROM users");
  const user_name = user_result.rows;
  // console.log(user_name);
  // res.render("index.ejs", {
  //   users: user_name,
  //   color: user_name.color,
  //   total: user_name.length,
  //   countries: user_name.countries,
  // });/
  res.redirect("/");
});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
