const express = require("express");
let router = express.Router();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
mongoose.set('strictQuery', true);
mongoose.connect(process.env.CLUSTER, { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: [true, "Email already in use."]
    },
    password: String
});
const User = new mongoose.model("User" , userSchema);


router.get("/" , (req, res) => {
    res.render("signup", {Rmsg: ""});
});
router.post("/", (req,res) =>{
    bcrypt.hash(req.body.password, saltRounds, (err,hash)=>{
        if(err){
            console.log(err);
        } else{
            const item = new User({
                name: req.body.name,
                email: req.body.email,
                password: hash
            });
            item.save((err) => {
                if(err){
                    res.render("signup" , {Rmsg: "Email already in use ! Go to Login."});
                } else{
                    res.render("home");
                }
            });
        }
    });
    
});


module.exports = {
    page: router,
    UserModel: mongoose.model("User", userSchema)
}