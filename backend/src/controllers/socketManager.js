import { log } from "node:console";
import { Socket } from "node:dgram";
import path from "node:path";
import { json } from "node:stream/consumers";
import { Server } from "socket.io";


let connections ={};
let messages ={};
let timeOnline={};


export const connectToSocket = (server)=>{
    const io = new Server(server)

    io.on("connection",(Socket)=>{
        Socket.on("join-call",(path)=>{
            if(connections[path]===undefined){
                connections[path]==[]
            }
            connections[path].push(Socket.id)
            timeOnline(Socket.id)= new Date();



            for(let a =0;a<connections[path].length; a++){
                io.to(connections[path][a]).emit("user-joined",Socket.id,connections[path])
            }

            if(messages[path]=== undefined){
                for(let a = 0; a< connections[path].length;a++){
                    io.to(Socket.id).emit("chat-messages",messages[path][a]['data'],
                        messages[path][a]['sender'],messages[path][a]['socket-id-sender']
                    )
                }

            }


        })
        Socket.on("signal",(told,message)=>{
            io.to(told).emit("signal",Socket.id,message);
        })

        Socket.on("chat-message",(data,sender)=>{

            const [matchingRoom,found]= Object.entries(connections).red
            uce(([room, isFound],[roomKey, roomValue])=>{
                if(!isFound && roomValue.includes(Socket.id)){
                    return[roomKey,true]
                }
                return [room, isFound];
            },['',false])

if(found === true){
    if(messages[matchingRoom]===undefined){
        messages[matchingRoom]=[]
    }
    messages[matchingRoom].push({'sender': sender,"data":data,"socket-id-sender":Socket.id})
    console.log("messages",key,":" , sender,data);
    connections[matchingRoom].forEach((elem)=>{
        io.to(elem).emit("chat-messages",data,sender,Socket.id)
    })
    
}

        })
        Socket.on("disconnect",()=>{
            var diffTime = Math.abs(timeOnline[Socket.id] - new Date())
            var key

            for(const [ k,v] of JSON.parse(JSON.stringify(Object.entries(connections)))){
                for(let a = 0; a< v.length;++a){
                    if(v[a]=== Socket.id){
                        key = k

                        for(let a = 0; a< connections[key].length;++a){
                            io.to(connections[key][a]).emit('user-left',Socket.id)

                        }
                        var index = connections[key].indexOf(Socket.id)
                        connections[key].splice(index,1)

                        if(connections[key].length===0 ){

                            delete connections[key]
                        }
                    }
                }
            }

        })
    })

}

export default connectToSocket;