const express = require('express');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// const cookieParaser = require("cookie-parser");
// const path = require('path');
// const passport = require("passport");
// const session = require("express-session")

const userRouter = require('./src/routes/user_routes');
const connectdb = require('./config/auth_db');
require("./src/auth/google_Auth")

const app = express() ;
dotenv.config();
connectdb();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(session({
//     secret : "mysecret",
//     resave : false,
//     saveUninitialized : true,
// }))
// app.use(passport.initialize());
// app.use(passport.session());
// // app.use(cookieParaser());
// app.set("view engine" , "ejs");
// app.set("views" , path.resolve("./src/views"))

// app.get("/user/signup" , (req,res) => {
//     res.render("signup");
// });

// app.get("/login" , (req,res) => {
//     res.render("login");
// });

// app.get("/google" , (req,res) => {
//     res.send('<a href = "/auth/google">Login with google</a>')
// });

// app.get('/auth/google',
//   passport.authenticate('google', { scope: ['profile' , 'email'] }));
 
// app.get('/auth/google/callback', 
//   passport.authenticate('google', 
//     { 
//         failureRedirect: '/login',
//         successRedirect: '/profile'
//     })

//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   }
//   );

// app.get('/profile' , (req,res) => {
//     if(!req.isAuthenticated()) return res.redirect('/login') ;
//     console.log(res.user);
//     res.send('<a href = "/logout">Logout </a>')
// });

// app.get("/logout" , (req,res) => {
//     req.logOut(() => {
//         res.redirect("/login");
//     })
// })



app.use('/user' , userRouter);

const port = process.env.PORT || 1000 ;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});