const socketio = require("socket.io");

exports.socketServer = (server) => {
  console.log("Socket Sever Init");
  let io = socketio.listen(server);
  let myio = io.of("/chat");
  //on connection
  myio.on("connection", (socket) => {
    socket.on("test-client", (data) => {
      console.log(data);
      socket.emit("welcome", "Welcome to Chat app");
    });
    socket.broadcast.emit("msg", "User joined the room");
    socket.on("disconnect", () => {
      console.log("Client Disconnected");
      //myio.emit("logout", "user left the room");
    });
  });
};
