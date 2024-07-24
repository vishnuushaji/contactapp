const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required: [true," Please enter a username"]
    },
    email:{
        type:String,
        required: [true," Please enter  email"],
        unique: [true," Entered email already taken"]
    },
    password:{
        type:String,
        required: [true," Please enter a password"]
    },
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("user",userSchema);