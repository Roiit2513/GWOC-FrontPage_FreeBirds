require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(cookieParser());
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
const signUp = require("./routes/signup");
app.use("/signup" , signUp.page);
const login = require("./routes/login");
app.use("/login" , login.page);
const select = require("./routes/select");
app.use("/select" , select);
const user = require("./routes/user");
app.use("/user" , user);
const auth = require("./middleware/auth");



app.get("/" , (req, res) => {
    res.render("home", {name: ""});
});
app.post("/", (req, res) => {
    if(req.body.button == "upload"){
        res.redirect("/upload");
    } else {
        res.redirect("/delete");
    }
});



const createToken = async() => {
    const token = await jwt.sign({_id: "63c59d9019c4b4b95a65b466"}, process.env.SECRET_KEY, {expiresIn: "5 minutes"});
    // console.log(token);
    const userVer = await jwt.verify(token, process.env.SECRET_KEY);
    // console.log(userVer);
}

createToken();

app.listen(process.env.PORT || 3000, () => {
    console.log("Running..");
});