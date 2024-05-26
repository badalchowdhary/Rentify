const express = require("express");
const router = express.Router();

const { handlePostNewProperty,
        handleGetSellerProperties,
        handleUpdateProperty,
        handleDeleteProperty,
        handleGetSpecificSellerProperty,
        handleGetInterestedBuyers,
    } = require('../controllers/seller');

const { verifyToken, verifyTokenAndSeller, verifyTokenAndBuyer } = require('../middleware/auth');

//post new Properties
router.post("/properties", verifyTokenAndSeller, handlePostNewProperty);

//Get all properties of that seller
router.get("/properties", verifyTokenAndSeller, handleGetSellerProperties);

//Get a specific property of that seller
router.get("/properties/singleproperty/:propertyId", verifyTokenAndSeller, handleGetSpecificSellerProperty);

//Get the interested buyers of a property
router.get("/properties/interestedbuyers/:propertyId", verifyTokenAndSeller, handleGetInterestedBuyers);

//Update a property of that seller
router.patch("/properties/:propertyId", verifyTokenAndSeller, handleUpdateProperty);

//Delete a property of that seller
router.delete("/properties/:propertyId", verifyTokenAndSeller, handleDeleteProperty);

module.exports = router;