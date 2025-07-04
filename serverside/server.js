const express=require("express")

const app=express();
const jwt=require("jsonwebtoken");
const mongoose=require("mongoose");

const JWT_SECRET="jsonwebtokensecretdonttrytocopyitudumbo";
app.post("/signup",(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;

})
app.post("/signin",(req,res)=>{

})

app.listen(3000,()=>{
    console.log("listening on port 3000");
})