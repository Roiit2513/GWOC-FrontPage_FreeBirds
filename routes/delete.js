const express = require("express");
let router = express.Router();

let upload = require("./upload");
let Cake = upload.cakeModel;

router.get("/" , (req, res) => {
    Cake.find((err, cakes) => {
        if(err){
            console.log(err);
        } else{
            res.render("delete" , {cakes: cakes, name: ""});
        }
    });
});
router.post("/" , (req, res) => {
    let str = req.body.checkbox;
    Cake.deleteOne({cakeId: str} , (err) => {
        if(err){
            console.log(err);
        }
    });
    res.redirect("/products");
});

module.exports = router;