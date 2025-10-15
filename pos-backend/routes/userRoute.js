const express=require('express');
const router=express.Router(); //It lets you group related routes together
const { register, login, getUserData } = require('../controllers/userController');
const { isVerifiedUser } = require('../middlewares/tokenVerification');

router.post("/register", register);
router.post("/login", login);
router.route("/").get(isVerifiedUser,getUserData);
module.exports=router;