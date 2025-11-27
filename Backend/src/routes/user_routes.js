const express = require("express");
const {signup_User , login_user , user_delete, password_update, logout_user} = require("../controllers/user_controllers");

const router = express.Router();

// User-Auth
router.post("/signup" , signup_User);
router.post("/login" , login_user);
router.post("/logout" , logout_user);
router.delete("/delete/:id" , user_delete);
router.put("/forgot-password/:id" , password_update);

module.exports= router ;