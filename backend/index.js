import express from"express";
import {createServer} from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import { log } from "node:console";
import { connect } from "node:http2";
import path from "node:path";
import userRoutes from "./src/routes/users.routes.js"
import connectToSocket from "./src/controllers/socketManager.js";
import { User } from "./src/models/user.model.js";
import router from "./src/routes/users.routes.js";




// main().then(()=>{console.log("Connection succesfull");
// })
// .catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/WeMeet');
// }



// ---------------------------------------------------



const app =express();
const server = createServer(app)
const io = connectToSocket(server)




app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb",extended: true}));

app.use("/api/v1/users", userRoutes)



app.set("port",(process.env.PORT || 8000))

app.get("/home",(req,res)=>{
    return res.json({"hello": "world"})
})  
 const start = async ()=>{

    // const connectionDb = await mongoose.connect("mongodb+srv://skashyap9711:sooraj4sure@cluster0.eq2kqa6.mongodb.net/")
       const connectionDb = await mongoose.connect('mongodb://127.0.0.1:27017/WeMeet');
       console.log(`MONGO Connection DB Host:${connectionDb.connection.host}`);
    
    server.listen(app.get("port"    ),()=>{
        console.log("Listining... on port 8000");
        
    })

 }

 start();
//  let User2  = new User({
    
//     name:"neeraj",
//     username:"neeraj52",
//     password:"password5"
  
// })
// User2.save().then((res)=>{
// console.log(res);

// })



