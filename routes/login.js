const express = require("express");
let router = express.Router();

let signup = require("./signup");
let User = signup.UserModel;
const bcrypt = require("bcrypt");

let LName;
router.get("/", (req, res) => {
    res.render("login", { Lmsg: "" , name: ""});
});
router.post("/", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        if (req.body.button == "login") {
            const userEmail = await User.findOne({email: email});
            const isMatch = await bcrypt.compare(password, userEmail.password);
            const token = await userEmail.generateAuthToken();
            res.cookie("jwt", token);
            console.log(req.cookies.jwt);
            if(isMatch){
                res.redirect("/user");
            } else{
                res.send("Invalid password Details ! Try again")
            }
        } else {
            const userEmail = await User.findOne({email: "a1bakery@gmail.com"});
            const isMatch = await bcrypt.compare(password, userEmail.password);
            const token = await userEmail.generateAuthToken();
            res.cookie("jwt", token);
            console.log('this is cookie ${req.cookies.jwt}');
            if(isMatch){
                res.status(201).render("select");
            } else{
                res.send("Invalid password Details ! Try again")
            }
        }
    } catch (error) {

    }

});


module.exports = {
    page: router,
    loginName: LName
}
