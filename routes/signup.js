const express = require("express");
const jwt = require("jsonwebtoken");
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
    password: String,
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }] 
});
userSchema.methods.generateAuthToken = async function () {
    try {
        // console.log(this._id);
        const User = this
        const token = jwt.sign({ _id: User._id.toString() }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token: token})
        await this.save();
        // console.log(token);
        return token;
    } catch (error) {
        console.log(error);
    }
}
const User = new mongoose.model("User", userSchema);


router.get("/", (req, res) => {
    res.render("signup", { Rmsg: "" , name: ""});
});
// router.post("/", (req,res) =>{
//     bcrypt.hash(req.body.password, saltRounds, (err,hash)=>{
//         if(err){
//             console.log(err);
//         } else{
//             const item = new User({
//                 name: req.body.name,
//                 email: req.body.email,
//                 password: hash
//             });
//             const token = item.generateAuthToken();
//             item.save((err) => {
//                 if(err){
//                     res.render("signup" , {Rmsg: "Email already in use ! Go to Login."});
//                 } else{
//                     res.render("home");
//                 }
//             });
//         }
//     });  
// });
router.post("/", async (req, res) => {
    try {
        bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
            if (err) {
                res.send("Email Already Registered. Go to login Page");
                console.log(err);
            } else {
                const registerUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: hash
                });
                // console.log("success" + registerUser);
                const token = await registerUser.generateAuthToken();
                // console.log("the token part" + token);
                res.cookie("jwt", token);
                // console.log(cookie);

                const registered = await registerUser.save();
                res.redirect("/user");
            }
        });
    } catch (error) {
        res.status(400).send(error);
        // console.log("error part");
    }
});



module.exports = {
    page: router,
    UserModel: mongoose.model("User", userSchema)
} 