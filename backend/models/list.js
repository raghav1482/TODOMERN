const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
    title:{
        type : String , 
        requires : true
    },
    body:{
        type : String , 
        required : true
    },
    user : [{
        type : mongoose.Types.ObjectId , 
        ref : "User" 
    }]
});

module.exports = mongoose.model("List" , listSchema);