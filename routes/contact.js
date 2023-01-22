const express = require("express");
let router = express.Router();

router.get("/" , (req, res) => {
    res.render("contact", {name: ""});
});

module.exports = router;