// AuthController.js

const express = require("express")
const router = express.Router()
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const APIError = require("../../models/APIError")
const User = require("../../models/UserModel")
const httpStatus = require("http-status")
const multer = require("multer")
const path = require("path")
const fs = require("fs")
const { promisify } = require("util")
const unlinkAsync = promisify(fs.unlink)

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "upload")
    },
    filename: (req, file, cb) => {
        const extName = path.extname(file.originalname).toLowerCase();
        cb(null, file.fieldname + '-' + Date.now() + extName)
    }
})
const upload = multer({ storage: storage })

router.post("/login", function (req, res) {

    let apiError = new APIError("Email and Password are required!", httpStatus.UNAUTHORIZED, 401)

    if (!req.body.email || !req.body.password) return res.json({
        status: false,
        message: apiError.message,
        statusCode: apiError.code
    })

    const hashPassword = bcrypt.hashSync(req.body.password, 8)

    User.findOne({email: req.body.email}).then(user => {

    })

})

router.post("/register", upload.single("avatar"), function (req, res) {
    let apiError = new APIError("Username or Email missing!", httpStatus.UNAUTHORIZED, 401)

    if (!req.body.userName || !req.body.email) {
        return res.status(apiError.code).json({
            status: false,
            message: "Username or Email missing!",
            statusCode: 401
        })
    }

    if (!req.body.password) {
        apiError = new APIError("Password is missing!", httpStatus.UNAUTHORIZED, 401)
        return res.status(apiError.code).json({
            status: false,
            message: "Password is missing!",
            statusCode: 401
        })
    }

    const hashPassword = bcrypt.hashSync(req.body.password, 8)
    const avatarUrl = req.file.path

    // Check if user exist in DB
    User.findOne({ $or: [{email: req.body.email}, {userName: req.body.userName}]  }).then(async user => {
        if (user) {

            //delete image when user already exists
            await unlinkAsync(avatarUrl)

            return res.json({
                status: false,
                message: "Username or Email has been taken",
                statusCode: 401
            })
        }

        // Create new user
        User.create({
            userName: req.body.userName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            password: hashPassword,
            gender: req.body.gender,
            age: req.body.age,
            avatarUrl: avatarUrl ? `${avatarUrl}` : ""
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
    }).catch(err => {
        return res.json({
            status: false,
            message: err.toString(),
            statusCode: 500
        })
    })

})

module.exports = router