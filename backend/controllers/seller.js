const Properties = require("../models/properties");
const User = require("../models/user");

const CryptoJS = require("crypto-js");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");



//Post New Property
async function handlePostNewProperty(req, res) {
    // const newProperty = new Properties(req.body);

    const newProperty = new Properties({
        title: req.body.title,
        desc: req.body.desc,
        price: req.body.price,
        area: req.body.area,
        bedrooms: req.body.bedrooms,
        bathrooms: req.body.bathrooms,
        location: req.body.location,
        amenties: req.body.amenties,
        nearby: req.body.nearby,
        postedby: req.user.id  // Set postedby to the ID of the logged-in user
    });

    try{
        const savedProperty = await newProperty.save();
        res.status(200).json(savedProperty);
    } catch(err) {
        res.status(500).json(err);
    }
}

//Get All Seller's Property
async function handleGetSellerProperties(req, res) {
    try{
        const property = await Properties.find({postedby: req.user.id});
        res.status(200).json(property);
    }catch(err){
        res.status(500).json(err);
    }
}

//Get a Specific seller property
async function handleGetSpecificSellerProperty(req, res) {
    try{
        const property = await Properties.findById(req.params.propertyId);
        res.status(200).json(property);
    }catch(err){
        res.status(500).json(err);
    }
}

//Get the interested buyers of a property
async function handleGetInterestedBuyers(req, res) {
    try{
        const property = await Properties.findById(req.params.propertyId);

        const interestedBuyersIds = property.interestedbuyers;

        const interestedBuyersDetails = await User.find({ _id: { $in: interestedBuyersIds } });

        res.status(200).json(interestedBuyersDetails);
    }
    catch(err) {
        res.status(500).json(err);
    }
}

//Update a Seller's Property
async function handleUpdateProperty(req, res) {
    try{
        const upadtedProperty = await Properties.findByIdAndUpdate(req.params.propertyId, {
            $set: req.body
        }, {new:true});
        res.status(200).json(upadtedProperty);
    }catch(err){
        res.status(500).json(err);
    }
}

//Delete a Seller's Property
async function handleDeleteProperty(req, res) {
    try{
        await Properties.findByIdAndDelete(req.params.propertyId);
        res.status(200).json("Product has been deleted !");
    }catch(err){
        res.status(500).json(err);
    }
}


module.exports = {
    handlePostNewProperty,
    handleGetSellerProperties,
    handleUpdateProperty,
    handleDeleteProperty,
    handleGetSpecificSellerProperty,
    handleGetInterestedBuyers,
}