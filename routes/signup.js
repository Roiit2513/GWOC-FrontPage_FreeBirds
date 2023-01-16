const express = require("express");
let router = express.Router();

router.get("/" , (req, res) => {
    res.render("signup");
});
router.post("/", (req,res) =>{

});


module.exports = router;