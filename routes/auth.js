const router = require("express").Router();
const User = require("../models/User");
const CryptoJs = require("crypto-js");
const { restart } = require("nodemon");


//Registration
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJs.AES.encrypt(req.body.password, process.env.SECRET_PASSWORD).toString() 
    });

    try {
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch(err) {
        res.status(500).json(err)
        console.log(err)
    }

})

// Login

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username})
        if (!user) res.status(401).json("invalid credentials")

        const hashedPass = CryptoJs.AES.decrypt(user.password, process.env.SECRET_PASSWORD)
        const passString = hashedPass.toString(CryptoJs.enc.Utf8);

        if (req.body.password !== passString) res.status(401).json("invalid credentials")

        const { password, ...otherInfo } = user._doc; //._doc is mongoDB format where user object stored


        res.status(200).json(otherInfo)

    } catch(err){
        res.status(500).json(err)
    }
})


module.exports = router