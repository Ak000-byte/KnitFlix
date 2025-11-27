const bcrypt = require('bcrypt');

const user_models = require("../models/user_models");
const { param } = require("../routes/user_routes");
const { setUser } = require('../../utils/user_auth');


const signup_User = async(req,res) => {
    try {
        const { name ,email,phone,password } = req.body ;

        //user exist
        const userExist = await user_models.findOne({email});
        if(userExist){
            return res.status(400).json({message : "User already exist"});
        }
        const hashed = await bcrypt.hash(password,10);
        //user doesn't exist
        const userCreate = await user_models.create({
            name,
            email,
            phone,
            password : hashed,
        });
        //render krna padega
        res.status(201).json({message : "User signup successfully"});
    } catch (error) {
        console.log(error); 
        return res.status(500).json({
        message: "error in signup",
        error: error.message,
        });
    }
};

const login_user = async(req,res) => {
    try {
        const {email , password} = req.body ;
        const user = await user_models.findOne({email});
        if(!user) {
            return res.json({
                error : "Invalid Email or Password",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ error: "Invalid Email or Password" });
        }
        const token = setUser(user);
        console.log(token);
        res.cookie("token" , token);
        res.json({ message: 'Logged in', token });
    } catch (error) {
        console.log(error); 
        return res.status(500).json({
        message: "error in signup",
        error: error.message,
        });
    }

};

const user_delete = async(req,res) =>{
    try {
        const id = req.params.id;
        await user_models.findByIdAndDelete(id);
        res.send("user delete successfully");
    } catch (error) {
        console.log(error); 
        return res.status(500).json({
        message: "error in fetch id",
        error: error.message,
        });
    }
};

const password_update = async (req, res) => {
  try {
    const id = req.params.id;
    const { password } = req.body;

    if (!password || typeof password !== 'string') {
      return res.status(400).json({ error: 'Password is required and must be a string' });
    }

    // if (password.length < 6) {
    //   return res.status(400).json({ error: 'Password must be at least 6 characters' });
    // }

    const hashedPassword = await bcrypt.hash(password.toString(), 10);
    const updatedUser = await user_models.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true } // returns updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // 3) Optionally: invalidate existing sessions/tokens here

    return res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'error updating password',
      error: error.message
    });
  }
};

const logout_user = async (req, res) => {
    try {
      res.clearCookie("token");
  
      return res.json({
        message: "Logged out successfully"
      });
  
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error during logout",
        error: error.message
      });
    }
  };
  

module.exports = {signup_User , login_user , user_delete,password_update , logout_user} ;