import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Permalist",
  password: "postgre@123",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [
  { id: 1, title: "Buy milk" },
  { id: 2, title: "Finish homework" },
];

app.get("/", (req, res) => {
  db.query("SELECT * FROM items ORDER BY id", (err, result) => {
    if (err) console.error(err);
    else {
      res.render("index.ejs", {
        listTitle: "Today",
        listItems: result.rows,
      });
    }
  });
});

app.post("/add", (req, res) => {
  const item = req.body.newItem;
  items.push({ title: item });
  db.query(
    "INSERT INTO items (title) VALUES ($1) RETURNING id, title",
    [item],
    (err, result) => {
      if (err) console.error(err);
      else res.redirect("/");
    }
  );
});

app.post("/edit", (req, res) => {
  const updatedTile = req.body["updatedItemTitle"];
  const whichIdUpdated = req.body["updatedItemId"];
  console.log(updatedTile);
  console.log(whichIdUpdated);
  db.query(
    "UPDATE items SET title=$1 WHERE id= $2",
    [updatedTile, whichIdUpdated],
    (err, result) => {
      if (err) console.error(err);
      else res.redirect("/");
    }
  );
});

app.post("/delete", (req, res) => {
  const idToDelete = req.body["deleteItemId"];
  console.log(idToDelete);
  db.query("DELETE FROM items WHERE id= $1", [idToDelete], (err, result) => {
    if (err) console.error(err);
    else res.redirect("/");
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
