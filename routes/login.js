const express = require("express");
let router = express.Router();

let signup = require("./signup");
let User = signup.UserModel;
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
    res.render("login", { Lmsg: ""});
});
router.post("/", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (req.body.button == "login") {
        User.findOne({ email: email }, (err, foundEmail) => {
            if (err) {
                console.log(err);
            } else {
                if (foundEmail) {
                    bcrypt.compare(password, foundEmail.password, (err, bool) => {
                        if (bool) {
                            res.render("home");
                        } else {
                            res.render("login", { Lmsg: "Incorrect Password ! Try again !"})
                        }
                    });
                } else {
                    res.render("login", { Lmsg: "Email not Registered. Go to Register." });
                }
            }
        });
    } else {
        User.findOne({ email: "a1bakery@gmail.com" }, (err, foundEmail) => {
            if (err) {
                console.log(err);
            } else {
                if (foundEmail) {
                    bcrypt.compare(password, foundEmail.password, (err, bool) => {
                        if (bool) {
                            res.render("select");
                        } else {
                            res.render("login", { Lmsg: "Incorrect Password ! Try again !"})
                        }
                    });
                } else {
                    res.render("login", { Lmsg: "Email not Registered. Go to Register." });
                }
            }
        });
    }
});


module.exports = router
