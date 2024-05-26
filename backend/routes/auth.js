const express = require("express");
const router = express.Router();

const {handleRegister, handleLogin} = require('../controllers/auth');


//REGISTER
router.post("/register", handleRegister);

//LOGIN
router.post("/login", handleLogin);

module.exports = router;