//Make connection
var socket = io.connect('http://localhost:4001');

//Query DOM
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

//Emit events

btn.addEventListener('click',function(){
    console.log(handle.value);
    socket.emit('chat',{
        message:message.value,
        handle:handle.value
    })
})
message.addEventListener('keypress',()=>{
    socket.emit('typing',handle.value);
})
//Listen for events
socket.on('chat',(data)=>{
    feedback.innerHTML="";
    console.log(data.handle);
    output.innerHTML +='<p><strong>'+ data.handle + ':</strong>' + data.message + '</p>'
    

})

socket.on('typing',function(data){
    feedback.innerHTML = '<p><em>'+ data + ': is typing a message...</em></p>';
})