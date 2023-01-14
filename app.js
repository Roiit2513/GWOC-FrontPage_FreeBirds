require("dotenv").config();
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
const upload = require("./routes/upload");
app.use("/upload" , upload.page);
const deleteItem = require("./routes/delete");
app.use("/delete" , deleteItem);


app.get("/" , (req, res) => {
    res.render("home");
});
app.post("/", (req, res) => {
    if(req.body.button == "upload"){
        res.redirect("/upload");
    } else {
        res.redirect("/delete");
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Running..");
});