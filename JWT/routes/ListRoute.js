module.exports = function (app) {
    let userHandler = require("../controllers/UserController");

    app.route('/auth/register')
        .post(userHandler.register);

    app.route("/auth/sign_in")
        .post(userHandler.signIn);
};