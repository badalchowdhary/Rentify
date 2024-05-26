const express = require("express");
const router = express.Router();

const {handleGetAllProperties, handleGetSpecificProperty, handleExpressInterestInProperty} = require('../controllers/buyer');
const { verifyToken, verifyTokenAndSeller, verifyTokenAndBuyer } = require('../middleware/auth');


//View All Properties
router.get("/properties", verifyTokenAndBuyer, handleGetAllProperties);

//View Specific Property
router.get("/properties/:id", verifyTokenAndBuyer, handleGetSpecificProperty);

//Express Interest in certain Property
router.patch("/properties/:id", verifyTokenAndBuyer, handleExpressInterestInProperty);

module.exports = router;