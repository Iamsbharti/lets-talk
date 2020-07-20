const socketio = require("socket.io");

exports.socketServer = (server) => {
  console.log("Socket Sever Init");
  let io = socketio.listen(server);
  console.log("io", io);
  let myio = io.of("");

  //on connection
  myio.on("connection", (socket) => {
    console.log("Client connected");
    socket.emit("testconn", "handshake from server");
  });
};
