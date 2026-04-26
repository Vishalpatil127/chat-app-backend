const express = require("express");
const port=3000;
const app=express();
const mongoose=require("mongoose");
const path = require("path");
const Chat = require("./models/chat");
const methodOverride=require("method-override");

require("./init");

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs"); 
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

app.get("/",(req,res)=>{
    console.log("this is the fisrt practising after long gap")
    res.send("backend working");
});
//index routeapp.use("/public", express.static(path.join(__dirname, "public")));
app.get("/chats",async(req,res)=>{
  let chats= await Chat.find();
  console.log(chats);
 res.render("index.ejs",{chats})
 //res.json(chats)
})
//new route
app.get("/chats/new",(req, res)=>{
    res.render("new.ejs")
})
//post request
app.post("/chats",(req,res)=>{
    let{from,to, msg}=req.body;
    let newchat= new Chat({
        from:from,
        to:to,
        msg:msg,
        created_at:new Date()
    });
    newchat.save()
    .then(res=>{console.log("chat was saved")})
    .catch(err=>{console.log(err)})
     res.redirect("/chats")
})

//edit chat 
app.get("/chats/:id/edit",async(req,res)=>{
    let {id}=req.params;
   let chat= await Chat.findById(id);
    res.render("edit.ejs",{chat})
})
//put request
app.put("/chats/:id",async(req,res)=>{
    let {id}=req.params;
    let{msg}=req.body;
    let updatedchat= await Chat.findByIdAndUpdate(
        id,
        {msg:msg},
        {runValidators:true, new:true})
    
        console.log(updatedchat);
        res.redirect("/chats");
});



app.listen(port,()=>{
console.log(`server is running on ${port}`)

});


