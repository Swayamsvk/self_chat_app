var express = require('express');
var socket = require('socket.io');
const connect = require("./dbserver")
const Chat = require("./models/chat.model");






//App Setup

var app = express();
var server = app.listen(4000,()=>{
    console.log("listening to port 4000")
})




//Static files

app.use(express.static('public'));

//Socket setup

var io = socket(server);

io.on('connection',(socket)=>{
    console.log('made socket connection',socket.id);

    //Handle chat event
    socket.on('chat',(data)=>{
        io.sockets.emit('chat',data);

        //recieve message and save to database
        socket.broadcast.emit("received",{ message: data});

        //save to database
        connect.then(db => {
            console.log("connected correctly to the server");

        let chatMessage = new Chat({ username: "Anonymous",chatMsg: data});
        chatMessage.save();
        })
    })

    socket.on('typing',function(data){
        socket.broadcast.emit('typing',data)
    })
})