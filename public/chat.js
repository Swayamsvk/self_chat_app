//Make connection
var socket = io.connect('http://localhost:4000');

//Query DOM

var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');

fetch("http://localhost:4000/chats/")
.then(data => {
  return data.json();
})
//   .then(data => {
//     output.innerHTML +='<p><strong>'+ data.sender + ':</strong>' + data.message + '</p>'
//   })
.then(json => {
  json.map(data => {
    let li = document.createElement("li");
    let span = document.createElement("span");
    messages.appendChild(li).append(data.message);
    messages
      .appendChild(span)
      .append("by " + data.sender + ": " + formatTimeAgo(data.createdAt));
  });
});

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
    // fetching initial chat messages from the database
})




socket.on('typing',function(data){
    feedback.innerHTML = '<p><em>'+ data + ': is typing a message...</em></p>';
})