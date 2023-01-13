const express = require('express') ; 
const app = express();
const http = require('http');
const { Server } = require('socket.io') ; 
const cors = require("cors") ; 


app.use(cors()) ; 

var server = http.createServer(app);
const io = new Server(server , {
    cors: {
        origin: '*',
      }
}) ; 



io.on('connection', function(socket){
  console.log(`User connected : ${socket.id}`) ; 

  socket.on("send_message" , (data)=>{
        console.log(data) ; 
        io.sockets.emit("receive_message", data );
      })
});


server.listen(5001 , ()=>{
    console.log("Server is Running") ; 
})


