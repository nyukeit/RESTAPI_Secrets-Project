import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

// URL of the API
const api_url = "https://secrets-api.appbrewery.com/";

// Axios Bearer Token authorization with API Provider
const bearerToken = "08f3026d-9c6c-4d88-a3b2-c579dc106247";
const config = {
  headers: {Authorzation: `Bearer ${bearerToken}`},
};

app.use(bodyParser.urlencoded({ extended: true }));

// Get the default page without any data changes
app.get("/", (req, res) => {
  res.render("index.ejs");
});

// Making a get request to get a particular secret based on ID input.
app.post("/get-secret", async (req, res) => {
  const id = req.body.secretid
  try {
    const result = await axios.get(api_url + "secrets/" + id, config);
    res.render("index.ejs", { result: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", {result: JSON.stringify(error.response.data)});
  }
});

app.post("/post-secret", async (req, res) => {
  try {
    const result = await axios.post(api_url + "secrets", req.body, config);
    res.render("index.ejs", { result: JSON.stringify(result.data)});
  } catch (error) {
    res.render("index.ejs", { result: JSON.stringify(error.response.data)});
  }
});

app.post("/put-secret", async (req, res) => {
  const id = req.body.secretid;
  try {
    const result = await axios.put(api_url + "secrets", req.body, config);
    res.render("index.ejs", { result: JSON.stringify(result.data)});
  } catch (error) {
    res.render("index.ejs", { result: JSON.stringify(error.response.data)});
  }
});

app.post("/patch-secret", async (req, res) => {
  const id = req.body.secretid;
  try {
    const result = await axios.patch(api_url + "secrets/" + id, req.body, config);
    res.render("index.ejs", { result: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", {result: JSON.stringify(error.response.data)});
  }
});

app.post("/delete-secret", async (req, res) => {
  const id = req.body.secretid;
  try {
    const result = await axios.delete(api_url + "secrets/" + id, req.body, config);
    res.render("index.ejs", { result: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", {result: JSON.stringify(error.response.data)});
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});