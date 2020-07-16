const express = require("express");
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const path = require("path");
const cors = require("cors");
const { connectdb } = require("./db-connect");
const router = require("./router");
const { logIp, notfound } = require("./middlewares");

//initiliaze express app
const app = express();

//applymiddlewares
app.use(logIp);
app.use(bodyparser.json());
dotenv.config();
app.use(cors(), bodyparser.urlencoded({ extended: true }), bodyparser.json());

//db-connection test
connectdb();

//configure router
app.use("/api/chat", router);

app.use(notfound);
//port definition
let port = process.env.PORT || process.env.API_PORT;
app.listen(port, () => console.log("API Server running on", port));

//production config
if (process.env.NODE_ENV === "production") {
  console.log("prod-env");
  app.use(express.static(path.resolve(__dirname, "../build")));
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve("index.html"));
  });
}
