const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

//sign up

router.post("/register" , async(req , res)=>{
    try{
        const {email  , password} = req.body;
        const user = await User.findOne({email : req.body.email});
        if(user){
            throw e;
        }
        else{
            const user = new User({email , password});
            await user.save().then(()=>{res.status(200).json({message:"SignUp Successful"})});
        }
    }catch(e){
        res.status(200).json({message:"User already exist"});
    }
})

//sign in
router.post("/login" , async(req , res)=>{
    try{
        const user = await User.findOne({email : req.body.email});
        if(!user){
            res.status(200).send({"message":"Please Sign Up"});
        }
        else{
            const password = req.body.password; 
            if(await bcrypt.compare(password , user.password)){
                res.status(200).send({id : user.id , message:"Signin Successful"});
            }
            else{
                res.status(200).send({"message":"Password not correct"});
            }
        }

    }catch(e){
        console.log("Err:"+e);
    }
})

module.exports = router;