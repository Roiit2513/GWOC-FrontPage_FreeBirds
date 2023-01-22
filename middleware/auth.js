const jwt = require("jsonwebtoken");
const signUp = require("../routes/signup");
const User = signUp.UserModel;

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
        // console.log(verifyUser);
        const user = await User.findOne({_id: verifyUser._id});
        // console.log(user.name);
        next();
    } catch (error) {
        res.status(401).send(error);
    }
}

module.exports = auth