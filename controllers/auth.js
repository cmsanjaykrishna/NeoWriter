const Jwt = require("jsonwebtoken");
require("dotenv").config();
const expressJwt = require("express-jwt");

const User = require("../models/user");

exports.signUp = async (req, res) => {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
        return res.status(403).json({
            error: "Email is already taken!"
        });
    }
    const user = await new User(req.body);
    await user.save();
    res.status(200).json({ message : "Signup successful! Please login."});
};

exports.signIn = (req,res) =>{
    const {email,password} = req.body;
    User.findOne({email}, (err,user)=>{
        if(err||!user){
            return res.status(401).json({
                error : "User with that email does not exist. Please signup."
            })
        }
        
        if (!user.authenticateUser(password)) {
            return res.status(401).json({
                error : "Email and password do not match."
            })
        }

        const {_id,name,email} = user;
        const token = Jwt.sign({_id},process.env.JWT_SECRET);
        res.cookie("t",token,{expires: new Date(Date.now() + 9999)});
        return res.json({token,user:{_id,name,email}
        });
    });
};

exports.signOut = (req,res) =>{
    res.clearCookie("t");
    return res.json({
        message : "Signout successful!"
    });
};

exports.requireSignIn = expressJwt({
    secret : process.env.JWT_SECRET,
    userProperty : "auth"
});