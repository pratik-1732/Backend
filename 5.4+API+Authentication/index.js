import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "pratik";
const yourPassword = "pratik123";
const yourAPIKey = "7dfe96e1-06ff-4ae9-a08b-658848102d98";
const yourBearerToken = "d0d6bbb2-5e9f-443e-9167-f9844269fd12";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
  try {
    const response = await axios.get(API_URL + "random");
    console.log(response.data);
    const data = JSON.stringify(response.data);
    res.render("index.ejs", { content: data });
  } catch (error) {
    console.log("error occured");
  }
});

app.get("/basicAuth", async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
  try {
    const URL = API_URL + "all?page=2";

    const response = await axios.get(URL, {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    });
    // const response = await axios.get(URL);
    console.log(response.data);
    const data = JSON.stringify(response.data);
    res.render("index.ejs", { content: data });
  } catch (error) {
    console.log("error occured");
  }
});

app.get("/apiKey", async (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
  try {
    const URL = API_URL + "filter";
    const response = await axios.get(URL, {
      params: {
        score: 5,
        apiKey: yourAPIKey,
      },
    });

    const data = JSON.stringify(response.data);
    console.log(data);
    res.render("index.ejs", { content: data });
  } catch (error) {
    console.log("error...");
  }
});

app.get("/bearerToken", async (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
  try {
    const URL = API_URL + "secrets/42";
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${yourBearerToken}`,
      },
    });

    const data = JSON.stringify(response.data);
    console.log(data);
    res.render("index.ejs", { content: data });
  } catch (error) {
    console.log("error...");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
