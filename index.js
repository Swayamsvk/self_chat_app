var express = require('express');
var socket = require('socket.io');

//App Setup

var app = express();
var server = app.listen(4001,()=>{
    console.log("listening to port 4001")
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
    })

    socket.on('typing',function(data){
        socket.broadcast.emit('typing',data)
    })
})