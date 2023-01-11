const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine' , 'ejs');

const about = require("./routes/about");
app.use("/about" , about);
const contact = require("./routes/contact");
app.use("/contact" , contact);
const products = require("./routes/products");
app.use("/products" , products);


app.get("/" , (req, res) => {
    res.render("home");
});


app.listen(process.env.PORT || 3000, () => {
    console.log("Running..");
});