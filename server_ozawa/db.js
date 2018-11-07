// db.js
const mongoose = require("mongoose")
const Promise = require("bluebird")
mongoose.Promise = Promise
mongoose.connect("mongodb://admin:admin123456@ds129610.mlab.com:29610/ozawa")