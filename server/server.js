const express = require("express");
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const path = require("path");
const cors = require("cors");
const { connectdb } = require("./db-connect");
//initiliaze express app
const app = express();

//applymiddlewares
app.use(bodyparser.json());
dotenv.config();
app.use(cors(), bodyparser.urlencoded({ extended: true }), bodyparser.json());

//db-connection test
connectdb();

//port definition
let port = process.env.PORT || process.env.API_PORT;
app.listen(port, () => console.log("API Server running on", port));

app.get("/test", (req, res) => {
  console.log("test route");
  res.send("test works");
});

//production config
if (process.env.NODE_ENV === "production") {
  console.log("prod-env");
  app.use(express.static(path.resolve(__dirname, "../build")));
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve("index.html"));
  });
}
