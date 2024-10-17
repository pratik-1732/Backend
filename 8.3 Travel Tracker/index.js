import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "postgre@123",
  port: "5432",
});

const app = express();
const port = 3000;

db.connect();

async function checkVisisted() {
  const result = await db.query("SELECT country_code FROM visited_countries");

  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  //Write your code here.
  const result = await checkVisisted();
  console.log(result);
  res.render("index.ejs", {
    countries: result,
    total: result.length,
  });
});

app.post("/add", async (req, res) => {
  let input_country = req.body["country"];
  input_country = titleCase(input_country);
  console.log(input_country);

  const code = await db.query(
    "SELECT country_code FROM countries WHERE country_name= $1",
    [input_country]
  );
  if (code.rows.lenght !== 0) {
    const countryCode = code.rows[0].country_code;
    await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [
      countryCode,
    ]);
    res.redirect("/");
  }
});

// to capitalize each word
function titleCase(str) {
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(" ");
}

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
