const asyncHandler = require('express-async-handler');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require('../models/userModel');


//@desc reg a user
//@route post api/users/register
//@acces public

const registerUser =  asyncHandler( async(req, res) => {
    const { username,email, password } = req.body;
    if(!username||!email||!password){
        res.status(404);
        throw new Error("all field are manditary");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(404);
        throw new Error("already registered");
    }
    //hash pass //can check npm documentation
    const hashedPassword = await bcrypt.hash(password,10);
    console.log("hash password ",hashedPassword);
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    console.log(`user created ${user}`);
    if(user){
        res.status(200).json({_id: user.id, email: user.email});
    } else{
        res.status(400);
        throw new Error("user data is not valid");
    }
    res.json({ message: "register the user"});
});

//@desc login a user
//@route post api/users/login
//@acces public

const loginUser =  asyncHandler(async (req, res) => {
    //jsonwebtoken used here
    const {email, password} = req.body;
    if (!email,!password) {
        res.status(400);
        throw new Error("all fields are mendetary");
    }
    const user = await User.findOne({ email});
    //compare password with hash password
    if (user && (await bcrypt.compare(password,user.password))) {
        const accessToken = jwt.sign(
           { 
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            },
        }, 
        process.env.ACCESS_TOKEN_SECRET);
        { expiresIn: "15m"}

        res.status(200).json({accessToken});
    }else {
        res.status(404);
        throw new Error("email or pass wrong");
    }
});    


//@desc current user
//@route post api/users/current
//@acces private

const currentUser =  asyncHandler(async (req, res) => {
    res.json(req.user);
});  

module.exports = {registerUser,loginUser,currentUser};
