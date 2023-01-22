const express = require("express");
let router = express.Router();

let upload = require("./upload");
let Cake = upload.cakeModel;

router.post("/", (req, res) => {
    if (req.body.button == "delete") {
        Cake.find((err, cakes) => {
            if (err) {
                console.log(err);
            } else {
                res.render("delete", { cakes: cakes, name: ""});
            }
        });
    } else{
        res.render("upload");
    }
});


module.exports = router;