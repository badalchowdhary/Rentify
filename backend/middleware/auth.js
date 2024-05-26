const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRETKEY, (err,user) => {
            if(err) {
                return res.status(403).json("Token is not valid!");
            }
            req.user = user;
            next();
        })
    } else{
        return res.status(401).json("You are not authenticated!");
    }
};

const verifyTokenAndSeller = (req,res,next) => {
    verifyToken(req, res, () => {
        if(req.user && req.user.isSeller){
            next();
        } else {
            res.status(403).json("You are not allowed to do that!");
        }
    });
};

const verifyTokenAndBuyer = (req,res,next) => {
    verifyToken(req,res,()=>{
        if(req.user && req.user.isBuyer){
            next();
        } else {
            res.status(403).json("You are not allowed to do that !");
        }
    });
};

module.exports = { 
    verifyToken, 
    verifyTokenAndSeller, 
    verifyTokenAndBuyer 
};