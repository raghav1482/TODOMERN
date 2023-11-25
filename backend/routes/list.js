const router = require("express").Router();

const User = require("../models/user");

const List = require("../models/list");

router.post("/addtask" , async(req , res)=>{
    try{
        const {title , body , id} = req.body;
        const existusr = await User.findById(id) ;
        if(existusr){
            const list = new List({title , body , user : existusr});
            await list.save();
            existusr.list.push(list);
            await existusr.save();
            res.status(200).send(list);
            console.log("Success");
        }
    }catch(e){
        console.log(e);
    }
})

// updatetask

router.put("/updatetask/:id" , async(req , res)=>{
    try{
        const {title , body} = req.body;
            const list = await List.findByIdAndUpdate(req.params.id , {title,body});
            await list.save().then(async()=>{await res.status(200).json({message:"Task Updated!!"});})
    }catch(e){
        console.log(e);
    }
})

//delete task
router.delete("/deletetask/:id" , async(req , res)=>{
    try{
        const {id} = req.body;
        const existusr = await User.findByIdAndUpdate(id,{$pull:{list:req.params.id}}) ;
        if(existusr){
            await List.findByIdAndDelete(req.params.id).then(()=>{res.status(200).send("DELETED");});
            console.log("Task Deleted");
        }
    }catch(e){
        console.log(e);
    }
})

//gettask

router.get("/gettasks/:id" , async (req , res)=>{
    try{
    const list = await List.find({user : req.params.id}).sort({createdAt : -1});
    res.status(200).json({list});
    }
    catch(e){
        console.log(e);
    }

})




module.exports = router;