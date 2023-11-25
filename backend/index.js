const express = require('express');
const auth = require("./routes/auth");
const list = require("./routes/list");
const dotenv = require("dotenv");
dotenv.config({path:"./.env"});
const PORT = process.env.PORT;
const cors=require("cors");


const app = express();
app.use(express.json())
app.use(cors(
    {
        origin:["https://personaltodo.vercel.app/","http://localhost:3000"],
        methods:["POST","GET","DELETE","PUT"],
        credentials:true
    }
));

// connect to database
require("./connection/conn");

app.get('/' , (req , res)=>{
    res.send("Hello");
})

app.use("/api/v1" , auth);
app.use("/api/v2" , list);
app.listen(8000 , ()=>{console.log("Server Started",PORT)});
