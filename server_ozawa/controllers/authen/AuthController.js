// AuthController.js

const express = require("express")
const router = express.Router()
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const APIError = require("./models/APIError")
const User = require("./models/UserModel")
const httpStatus = require("http-status")
const multer = require("multer")
const upload = multer({dest: __dirname + '/upload'})


router.post("/register", upload.single("avatar"), function (req, res) {
    let apiError = new APIError("Username or Email missing!", httpStatus.UNAUTHORIZED, 401)
    if (!req.body.userName && !req.body.email) {
        return res.status(apiError.code).json({
            status: false,
            message: apiError.message,
            statusCode: apiError.code
        })
    }

    if (!req.body.password) {
        apiError = new APIError("Password is missing!", httpStatus.UNAUTHORIZED, 401)
        return res.status(apiError.code).json({
            status: false,
            message: apiError.message,
            statusCode: apiError.code
        })
    }

    const hashPassword = bcrypt.hashSync(req.body.password, 8)
    const avatarUrl = req.body.avatar

    // Create new user
    User.create({
        userName: req.body.userName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: hashPassword,
        avatarUrl: avatarUrl ? `/upload/${avatarUrl}` : ""
    }, function (err, user) {
        if (err) {
            apiError = new APIError(err, httpStatus.INTERNAL_SERVER_ERROR, 500)
            return res.json({
                status: false,
                message: apiError.message,
                statusCode: apiError.code
            })
        }

        if (user) {
            apiError = new APIError("Create user success", httpStatus.OK, 200)
            return res.json({
                status: true,
                message: apiError.message,
                statusCode: apiError.code,
                data: user
            })
        }

    })

})