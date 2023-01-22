const express = require("express");
let router = express.Router();
const auth = require("../middleware/auth");

const jwt = require("jsonwebtoken");
const signUp = require("./signup");
const User = signUp.UserModel;
router.use(express.static("public"));

let upload = require("./upload");
let Cake = upload.cakeModel;

router.get("/", auth, async (req, res) => {
    const token = req.cookies.jwt;
    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({_id: verifyUser._id});
    res.render("home" , {name: user.name});
});
let flavor = "All";
let cost = 10000;
let wp = process.env.WHATSAPP;
router.get("/products" , async(req,res ) => {
    const token = req.cookies.jwt;
    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({_id: verifyUser._id});
    Cake.find((err,cakes) => {
        if(err){
            console.log(err);
        } else{
            res.render("products" , {arr: cakes, flavor: flavor, cost: cost, wp: wp, name: user.name});
        }
    });
});
router.post("/products" , async (req, res) => {
    const token = req.cookies.jwt;
    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({_id: verifyUser._id});
    if(req.body.priceRange){
        cost = Number(req.body.priceRange);
    }
    if(req.body.flavors){
        flavor = req.body.flavors;
    }
    if(req.body.filter){
        if(req.body.filter == "cakeCost"){
            Cake.find({}).sort({cakeCost: 1}).exec((err,cakes) => {
                if(err){
                    console.log(err);
                } else{
                    res.render("products" , {arr: cakes, flavor: flavor, cost: cost, wp: wp, name: user.name});
                }
            });
        }
        if(req.body.filter == "cakeFlavor"){
            Cake.find({}).sort({cakeFlavor: 1}).exec((err,cakes) => {
                if(err){
                    console.log(err);
                } else{
                    res.render("products" , {arr: cakes, flavor: flavor, cost: cost, wp: wp, name: user.name});
                }
            });
        }
        if(req.body.filter == "cakePop"){
            Cake.find({}).sort({cakeId: 1}).exec((err,cakes) => {
                if(err){
                    console.log(err);
                } else{
                    res.render("products" , {arr: cakes, flavor: flavor, cost: cost, wp: wp, name: user.name});
                }
            });
        }
    }
    Cake.find((err,cakes) => {
        if(err){
            console.log(err);
        } else{
            res.render("products" , {arr: cakes, flavor: flavor, cost: cost, wp: wp, name: user.name});
        }
    });
});

router.get("/about", auth, async (req, res) => {
    const token = req.cookies.jwt;
    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({_id: verifyUser._id});
    res.render("about" , {name: user.name});
});
router.get("/contact", async (req, res) => {
    const token = req.cookies.jwt;
    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({_id: verifyUser._id});
    res.render("contact" , {name: user.name});
});
router.get("/logout", async (req, res) => {
    try {
        res.clearCookie("jwt");
        res.redirect("/");
    } catch (error) {
        res.send(error);
    }
});
router.get("/select", async (req, res) => {
    const token = req.cookies.jwt;
    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({_id: verifyUser._id});
    res.render("select" , {name: user.name});
});
router.post("/select", async(req, res) => {
    const token = req.cookies.jwt;
    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({_id: verifyUser._id});
    if (req.body.button == "delete") {
        Cake.find((err, cakes) => {
            if (err) {
                console.log(err);
            } else {
                res.render("delete", { cakes: cakes, name: user.name});
            }
        });
    } else{
        res.render("upload", {name: user.name});
    }
});


module.exports = router;