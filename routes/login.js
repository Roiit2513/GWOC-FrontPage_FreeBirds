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
            let userEmail = await User.findOne({email: email});
            if(userEmail){
                const isMatch = await bcrypt.compare(password, userEmail.password);
                const token = await userEmail.generateAuthToken();
                res.cookie("jwt", token);
                console.log(req.cookies.jwt);
                if(isMatch){
                    res.redirect("/user");
                } else{
                    res.render("login", {Lmsg: "Incorrect Password. Try again !", name: ""});
                }
            } else{
                res.render("login", {Lmsg: "Invalid Email Id", name: ""});
            }
        } else {
            if(req.body.email == "a1bakery@gmail.com"){
                let ownerEmail = await User.findOne({email: "a1bakery@gmail.com"});
                const isMatch = await bcrypt.compare(password, ownerEmail.password);
                const token = await ownerEmail.generateAuthToken();
                res.cookie("jwt", token);
                if(isMatch){
                    res.redirect("/user/select");
                } else{
                    res.render("login", {Lmsg: "Incorrect Password. Try again !", name: ""});
                }
            } else{
                res.render("login", {Lmsg: "Invalid Email Id", name: ""});
            }
        }
    } catch (error) {
        console.log(error);
    }

});


module.exports = {
    page: router,
    loginName: LName
}
