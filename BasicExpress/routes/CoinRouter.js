const express = require("express");
const app = express();
const Coin = require("../models/Coin.model");

const CoinRouter = express.Router();

CoinRouter.route("/").get(function (req, res) {
   res.render("index");
});

CoinRouter.route("/create").get(function (req, res) {
    res.render("create");
});

CoinRouter.route("/post").post(function (req, res) {
    //Create model from the req
    const coin = new Coin(req.body);
    console.log("Model: ", coin);

    // Save model into MongoDB
    coin.save()
        .then(coin => {
            console.log("Redirect to /coins");
            res.redirect("/coins");
        })
        .catch(err => {
           res.status(400).send("Unable to save to database");
        });
});

module.exports = CoinRouter;