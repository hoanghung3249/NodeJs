const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");
const errorHandler = require("errorhandler");

const PORT = 3000;


//Config app
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, function (req, res) {
   console.log("Server start on port: ", PORT);
});