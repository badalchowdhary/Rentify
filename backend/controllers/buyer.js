const Properties = require("../models/properties");
const User = require("../models/user");

const CryptoJS = require("crypto-js");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");



//GetAllProperties
async function handleGetAllProperties(req, res) {
    try{
        const properties = await Properties.find({});
        res.status(200).json(properties);
    }catch(err){
        res.status(500).json(err);
    }
}

//GetSpecificProperty
async function handleGetSpecificProperty(req, res) {
    try{
        const property = await Properties.findById(req.params.id);
        res.status(200).json(property);
    }catch(err){
        res.status(500).json(err);
    }
}

//Express interest in certain property
async function handleExpressInterestInProperty(req, res) {
    try{
        const upadtedProperty = await Properties.findByIdAndUpdate(req.params.id, {
            $push: { interestedbuyers: req.user.id }
        }, {new:true});

        const seller = await User.findById(upadtedProperty.postedby);

        const response = {
            property: upadtedProperty,
            seller: seller
        };
        res.status(200).json(response);
    }
    catch(err) {
        res.status(500).json(err);
    }
}



module.exports = {
    handleGetAllProperties,
    handleGetSpecificProperty,
    handleExpressInterestInProperty,
}