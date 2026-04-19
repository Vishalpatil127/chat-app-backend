const mongoose = require("mongoose");
const Chat = require("./models/chat")


//connection 
mongoose.connect("mongodb://127.0.0.1:27017/whatsapp")
.then(()=>{
    console.log("connection establised sussfully");
    
}).catch(err =>{
    console.log(err)
});

//insert
// let chat1 = new Chat({
//     from:"vishal",
//     to:"vijay",
//     msg:"have completed the assignment ",
//     created_at:Date.now()
// })
// chat1.save().then((res)=>{
//     console.log(res)
// })

Chat.insertMany([
   {
    from:"vishal",
    to:"vijay",
    msg:"have completed the assignment ",
    created_at:Date.now()
    },
    {
        from:"nikhil",
        to:"vinay",
        msg:"are you coming to the class",
        created_at:Date.now()
    }
]
).then((res)=>{
    console.log(res)
}).catch((err)=>{   
    console.log(err)
})