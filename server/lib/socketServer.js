const socketio = require("socket.io");

exports.socketServer = (server) => {
  console.log("Socket Sever Init");
  let io = socketio.listen(server);
  let myio = io.of("/chat");
  let onlineUsers = [];
  //on connection
  myio.on("connect", (socket) => {
    socket.emit("welcome", "Welcome to Chat app");

    socket.on("userEmail", (data) => {
      myio.emit("instantOnline", `${data} came online`);
      console.log("online user", data);
      onlineUsers.push(data);
    });

    socket.on("room", (room) => {
      console.log("Room", room);
      //set chat room
      socket.room = room;
      //join chat room
      socket.join(socket.room);
      console.log("onlineusers-array", onlineUsers);
      myio.emit("online-users", onlineUsers);
      //socket.to(socket.room).broadcast.emit("online-users", onlineUsers);
    });

    socket.on("disconnect", () => {
      console.log("Client Disconnected");
      //myio.emit("logout", "user left the room");
    });
  });
};
