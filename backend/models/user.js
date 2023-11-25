const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    email:{
        type : String , 
        requires : true
    },
    password:{
        type : String , 
        required : true
    },
    list : [{
        type : mongoose.Types.ObjectId , 
        ref : "List" 
    }]
});

//middleware for bcrypt
userSchema.pre('save' , async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,12);
    }
    next();
})
module.exports = mongoose.model("User" , userSchema);