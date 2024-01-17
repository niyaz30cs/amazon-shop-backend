const express = require("express");
const Products = require("../models/productsSchema");
const USER = require("../models/userSchema");
const router = new express.Router();
const bcrypt = require("bcryptjs");
const athenticate = require("../middleware/authenticate");


// get productsdata api
router.get("/getproducts", async (req, res) => {
    try {
        const productsdata = await Products.find();
        // console.log("original data"+productdata);
        res.status(201).json(productsdata);
    } catch (error) {
        console.log("Error" + error.message);
    }
})

router.get("/getproductsone/:id", async (req, res) => {
    try {
        const { id } = req.params;
        // console.log(id);

        const individualData = await Products.findOne({ id: id })
        // console.log(individualData+"individualData");

        res.status(201).json(individualData);

    } catch (error) {
        res.status(400).json(individualData);
        console.log("Error" + error.message);
    }
})

router.post("/register", async (req, res) => {
    // console.log(req.body);
    const { fname, email, mobile, password, cpassword } = req.body;

    if (!fname || !email || !mobile || !password || !cpassword) {
        res.status(422).json({ error: "fill the all data" });
        console.log("Not Data Available");
    }
    try {
        const preuser = await USER.findOne({ email: email });
        if (preuser) {
            res.status(422).json({ error: "this user is already register" })

        } else if (password !== cpassword) {
            res.status(422).json({ error: "password and cpassword not match" })
        } else {
            const finalUser = new USER({
                fname, email, mobile, password, cpassword
            });

            const storeData = await finalUser.save();
            console.log(storeData);
            res.status(201).json(storeData);
        }
    } catch (error) {

    }
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: "fill the all data" })
    };
    try {
        const userlogin = await USER.findOne({ email: email });
        console.log(userlogin);

        if (userlogin) {
            const isMatch = await bcrypt.compare(password, userlogin.password);
            console.log("Password Match:-" + isMatch);

            const token = await userlogin.generateAuthtoken();
            console.log("Generated Token:-" + token);
            res.cookie("Amazonweb", token, {
                expire: new Date(Date.now() + 900000),
                httpOnly: true
            })
            if (!isMatch) {
                res.status(400).json({ error: "invalid details" });
            } else {
                res.status(201).json(userlogin);
            }
        }

    } catch (error) {
        res.status(400).json({ error: "invalid details" })
    }
});

router.post("/addcart/:id", athenticate, async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await Products.findOne({ id: id });
        console.log("Cart Value" + cart);

        const UserContact = await USER.findOne({ _id: req.userID });
        console.log(UserContact);

        if (UserContact) {
            const cartData = await UserContact.addcartdata(cart);
            await UserContact.save();
            console.log(cartData);
            res.status(201).json(UserContact);
        } else {
            res.status(401).json({ error: "Invalid user" });
        }

    } catch (error) {
        res.status(401).json({ error: "Invalid user" });
    }
})

router.get("/cartdetails",athenticate,async(req,res)=>{
    try {
        const buyUser=await USER.findOne({_id:req.userID})
        res.status(201).json(buyUser)
    } catch (error) {
        console.log("Error"+error);
    }
})

router.get("/validuser",athenticate,async(req,res)=>{
    try {
        const validuserone=await USER.findOne({_id:req.userID})
        res.status(201).json(validuserone)
    } catch (error) {
        console.log("Error"+error);
    }
}) 

router.delete("/remove/:id",athenticate,async(req,res)=>{
    try {
        const {id}=req.params;
        req.rootUser.carts=req.rootUser.carts.filter((cruval)=>{
            return cruval.id!=id;
        })
          req.rootUser.save();
          res.status(201).json(req.rootUser);
          console.log("item remove");
    } catch (error) {
        console.log("Error"+error);
        res.status(400).json(req.rootUser);
        
    }
})

router.get("/logout",athenticate,(req,res)=>{
    try {
        req.rootUser.tokens=req.rootUser.tokens.filter((curElem)=>{
            return curElem.token!==req.token
        });
        res.clearCookie("Amazonweb",{path:"/"})
    
        req.rootUser.save();
        res.status(201).json(req.rootUser.tokens)
        console.log("user logout");
    } catch (error) {
        console.log("error for user logout");
    }
})



module.exports = router;