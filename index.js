var express = require('express');
var socket = require('socket.io');
const connect = require("./dbserver")
const Chat = require("./models/chat.model");
const  chatRouter  = require("./routes/chat.route");




//App Setup

var app = express();
var server = app.listen(4000,()=>{
    console.log("listening to port 4000")
})

app.use(express.json());




//Static files

app.use(express.static('public'));

//routes
app.use("/chats", chatRouter);

//Socket setup

var io = socket(server);

io.on('connection',(socket)=>{
    console.log('made socket connection',socket.id);

    //Handle chat event
    socket.on('chat',(data)=>{
        io.sockets.emit('chat',data);

        // //recieve message and save to database
        // socket.broadcast.emit("received",{ message: data});

        // //save to database
        // connect.then(db => {
        //     console.log("connected correctly to the server");

        // let chatMessage = new Chat({ username: "Anonymous",chatMsg: data});
        // chatMessage.save();
        // })
        //broadcast message to everyone in port:5000 except yourself.
        socket.broadcast.emit("received", { message: data.message  });

        //save chat to the database
        connect.then(db  =>  {
        console.log("connected correctly to the server");

        let  chatMessage  =  new Chat({ message: data.message, sender: data.handle});
        chatMessage.save();
        });
    })

    socket.on('typing',function(data){
        socket.broadcast.emit('typing',data)
    })
})