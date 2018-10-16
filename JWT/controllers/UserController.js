const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");

exports.register = function (req, res) {
    let newUser = new User(req.body);
    newUser.has_password = bcrypt.hashSync(req.body.password, 10);
    newUser.save().then(user => {
       user.has_password = undefined;
       res.status(200).json(user);
    }).catch(err => {
        res.status(400).json(err);
    });
};

exports.signIn = function (req, res) {
    //Check if user exist
    User.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err){
            res.status(400).json({ message: `Error when finding user: ${err}`});
        } else {
            if (!user) {
                res.status(401).json({ message: 'Authentication failed. User not found.' });
            } else if (user) {
                if (!user.comparePassword(req.body.password)) {
                    res.status(401).json({ message: 'Authentication failed. Wrong password.' });
                } else {
                    //Sign in with json web token
                    return res.json({token: jwt.sign({email: user.email, fullName: user.fullName, _id: user.
                    _id}, "RESTFULAPIs")});
                }
            }
        }
    });
};

exports.loginRequired = function (req, res, next) {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
};