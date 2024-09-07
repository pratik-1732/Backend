// HINTS:
// 1. Import express and axios

// 2. Create an express app and set the port number.

// 3. Use the public folder for static files.

// 4. When the user goes to the home page it should render the index.ejs file.

// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.

// 6. Listen on your predefined port and start the server.

import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
app.use(express.static("public"));

const API_URL = "https://secrets-api.appbrewery.com/";

const yourUsername = "pratik";
const yourPassword = "pratik123";
const yourAPIKey = "7dfe96e1-06ff-4ae9-a08b-658848102d98";
const yourBearerToken = "d0d6bbb2-5e9f-443e-9167-f9844269fd12";

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "random");
    const data = response.data;
    // console.log(data.secret);
    res.render("index.ejs", { secret: data.secret, user: data.username });
  } catch (error) {
    console.log("error...");
  }
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
