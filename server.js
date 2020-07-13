const express = require("express");
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const path = require("path");
//initiliaze express app
const app = express();

//applymiddlewares
app.use(bodyparser.json());
dotenv.config();
let port = process.env.PORT || process.env.API_PORT;
app.listen(port, () => console.log("Server running on", port));

app.get("/test", (req, res) => {
  console.log("test route");
  res.send("test works");
});

if (process.env.NODE_ENV === "production") {
  console.log("prod");
  app.use(express.static(path.resolve(__dirname, "../../build")));
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve("index.html"));
  });
}
