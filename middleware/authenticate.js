const jwt = require("jsonwebtoken");
const USER = require("../models/userSchema");
const secretKey = process.env.KEY;
// const secretKey = "niyaz";


const athenticate = async (req, res, next) => {
    try {
        const token =req.cookies.Amazonweb;
        // const token = req.body.jwt;
        const varifyToken = jwt.verify(token,secretKey);
        console.log(varifyToken);

        const rootUser = await USER.findOne({ _id: varifyToken._id, "tokens.token": token })
        console.log(rootUser);

        if (!rootUser) {
            throw new Error("User Not Found");
        }
        req.token = token
        req.rootUser = rootUser
        req.userID = rootUser._id

        next();
    } catch (error) {
        res.status(401).send("Unauthorized:No Token Provided")
        console.log(error);
    }
}

module.exports = athenticate;