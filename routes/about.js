const express = require("express");
let router = express.Router();

router.get("/" , (req, res) => {
    res.render("about", {name: ""});
});

module.exports = router;