const express = require("express");
let router = express.Router();

const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
// mongoose.connect("mongodb://127.0.0.1:27017/CakeDB", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(process.env.CLUSTER , { useNewUrlParser: true, useUnifiedTopology: true });
const CakeSchema = new mongoose.Schema({
    cakeId: Number,
    cakeName: String,
    cakeFlavor: String,
    cakeCost: Number,
    cakeDiscription: String
});
const Cake = new mongoose.model("Cake", CakeSchema);

router.get("/", (req, res) => {
    res.render("upload");
});
router.post("/", (req, res) => {
    let id = req.body.Id;
    let Name = req.body.Name;
    let Flavor = req.body.Flavor;
    let Cost = req.body.Cost;
    let Discription = req.body.Discription;
    let item = new Cake({
        cakeId: id,
        cakeName: Name,
        cakeFlavor: Flavor,
        cakeCost: Cost,
        cakeDiscription: Discription
    });
    Cake.insertMany([item], (err) => {
        if(err){
            console.log(err);
        }
    });
    res.render("upload");
});

module.exports = {
    cakeModel: mongoose.model("Cake", CakeSchema),
    page: router
}
