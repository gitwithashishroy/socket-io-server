const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

var server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", function (socket) {
  console.log(`User connected : ${socket.id}`);

  socket.on("send_message", (data) => {
    console.log(data);
    io.sockets.emit("receive_message", data);
  });

  socket.on("send_not_done", (data) => {
    console.log(data);
    io.sockets.emit("receive_status", data);
  });

  socket.on("send_done", (data) => {
    console.log(data);
    io.sockets.emit("receive_status", data);
  });

  socket.on("send_no_status", (data) => {
    console.log(data);
    io.sockets.emit("receive_status", data);
  });

  socket.on("delete" , data=>{
    console.log(data) ; 
    io.sockets.emit("receive_delete" , data) ; 
  })
});

server.listen(5000, () => {
  console.log("Server is Running");
});
