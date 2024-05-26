const User = require("../models/user");

const CryptoJS = require("crypto-js");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");


async function handleRegister(req, res) {
    const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRETKEY).toString(),
        isBuyer: req.body.isBuyer,
        isSeller: req.body.isSeller
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
}


async function handleLogin(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email});
        if(!user) return res.status(401).json("Wrong Credentials !");

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECRETKEY);
        const ogPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        if(ogPassword !== req.body.password) return res.status(401).json("Wrong Credentials !");

        const accessToken = jwt.sign(
            {
                id: user._id,
                isBuyer: user.isBuyer,
                isSeller: user.isSeller,
            },
            process.env.JWT_SECRETKEY,
            {expiresIn: "3d"}
        );

        const { password, ...others } = user._doc;

        return res.status(200).json({...others, accessToken});

    } catch (err) {
        return res.status(500).json(err);
    }
}

module.exports = {
    handleRegister,
    handleLogin,
}