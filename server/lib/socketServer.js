const socketio = require("socket.io");

exports.socketServer = (server) => {
  console.log("Socket Sever Init");
  let io = socketio.listen(server);

  let myio = io.of("/chat");

  //on connection
  myio.on("connection", (socket) => {
    socket.on("test-client", (data) => {
      console.log(data);
      socket.emit("testconn", "Welcome to Chat app");
    });

    socket.on("disconnect", (data) => {
      console.log("Client Disconnected");
    });
  });
};
