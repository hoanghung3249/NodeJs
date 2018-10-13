const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./db");
const Course = require("./models/Course");
const CourseRoute = require("./routes/CourseRoute");

app.use(bodyParser.json());

//Connect mongo database
mongoose.connect(config.DB).then(()=>{
   console.log("Database is connected");
},err => {
    console.log("Can not connect to the database: ", err);
});

app.use("/course", CourseRoute);

app.listen(3000, function (req, res) {
    console.log("Server start on port: 3000");
});