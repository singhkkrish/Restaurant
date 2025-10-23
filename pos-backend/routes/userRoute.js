const express=require('express');
const router=express.Router(); //It lets you group related routes together
const { register, login, getUserData,logout } = require('../controllers/userController');
const { isVerifiedUser } = require('../middlewares/tokenVerification');

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(isVerifiedUser, logout)
router.route("/").get(isVerifiedUser,getUserData);
module.exports=router;