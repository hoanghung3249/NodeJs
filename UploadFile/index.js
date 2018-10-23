const express = require("express");
const app = express();
const PORT = 3000;
const multer = require("multer");
const upload = multer({dest: __dirname + '/upload'});

app.use(express.static(__dirname + "/upload"));

app.post("/upload", upload.single("avatar"), function (req, res) {
   if (req.file) {
       res.status(200).json(req.file);
   } else {
       res.status(400).json({"mess": "error when upload"});
   }
});

app.listen(PORT, function (req, res) {
   console.log("Server listen on port: ", PORT);
});
