const express = require("express");
let router = express.Router();
let upload = require("./upload");
let Cake = upload.cakeModel;

let flavor = "All";
let cost = 10000;
let wp = process.env.WHATSAPP;
router.get("/" , (req, res) => {
    Cake.find((err,cakes) => {
        if(err){
            console.log(err);
        } else{
            res.render("products" , {arr: cakes, flavor: flavor, cost: cost, wp: wp});
        }
    });
});
router.post("/" , (req, res) => {
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
                    res.render("products" , {arr: cakes, flavor: flavor, cost: cost, wp: wp});
                }
            });
        }
        if(req.body.filter == "cakeFlavor"){
            Cake.find({}).sort({cakeFlavor: 1}).exec((err,cakes) => {
                if(err){
                    console.log(err);
                } else{
                    res.render("products" , {arr: cakes, flavor: flavor, cost: cost, wp: wp});
                }
            });
        }
        if(req.body.filter == "cakePop"){
            Cake.find({}).sort({cakeId: 1}).exec((err,cakes) => {
                if(err){
                    console.log(err);
                } else{
                    res.render("products" , {arr: cakes, flavor: flavor, cost: cost, wp: wp});
                }
            });
        }
    }
    Cake.find((err,cakes) => {
        if(err){
            console.log(err);
        } else{
            res.render("products" , {arr: cakes, flavor: flavor, cost: cost, wp: wp});
        }
    });
});
module.exports = router;