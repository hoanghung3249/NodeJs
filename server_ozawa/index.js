// index.js
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const PORT = 3000
const APIError = require("./models/APIError")
const httpStatus = require("http-status")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

app.use("/", function (req, res) {
    const apiError = new APIError("Cannot find a page!", httpStatus.NOT_FOUND, 404)
    res.status(apiError.status).json({
        message: apiError.message,
        status: false
    })
})

app.listen(PORT, function (req, res) {
    console.log("Server start on Port: ", PORT)
})
