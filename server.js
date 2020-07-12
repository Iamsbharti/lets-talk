const express = require("express");
const dotenv = require("dotenv");
const bodyparser = require("body-parser");

//initiliaze express app
const app = express();

//applymiddlewares
app.use(bodyparser.json());
dotenv.config();

app.listen(4001, () => console.log("Server running on 3001"));
