const express = require("express");
const port=3000;
const app=express();
const mongoose=require("mongoose");
const path = require("path");
const Chat = require("./models/chat");

require("./init");

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs"); 
app.use(express.static(path.join(__dirname, "public")));

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


app.listen(port,()=>{
console.log(`server is running on ${port}`)

});


