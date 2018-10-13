const express = require("express");
const app = express();
const CoinRouter = require("./routes/CoinRouter");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.promise = global.Promise;
mongoose.connect("mongodb://localhost/basicexpress");

app.use(express.static("public"));
app.set("view engine", "ejs");

app.use("/hello", function (req, res) {
    res.send("Hello world");
});

app.use("/coins", CoinRouter);

app.use("/", function (req, res) {
   res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(3000, function(){
   console.log("Server start on port: 3000");
});