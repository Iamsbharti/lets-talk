const socketio = require("socket.io");

exports.socketServer = (server) => {
  console.log("Socket Sever Init");
  let io = socketio.listen(server);

  let myio = io.of("/chat");

  //on connection
  myio.on("connection", (socket) => {
    console.log("Client connected");
    socket.emit("testconn", "handshake from server");
    socket.on("test-client", (data) => {
      console.log("Message from client", data);
    });
    socket.on("disconnect", (data) => {
      console.log("Client Disconnected");
    });
  });
};
