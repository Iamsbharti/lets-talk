const socketio = require("socket.io");

exports.socketServer = (server) => {
  console.log("Socket Sever Init");
  let io = socketio.listen(server);
  let myio = io.of("/chat");
  let onlineUsers = [];
  //on connection
  myio.on("connect", (socket) => {
    /**Emmitt welcome text */
    socket.emit("welcome", "Welcome to Chat app");

    /**Listen to users'name */
    socket.on("userEmail", (data) => {
      myio.emit("instantOnline", `${data} came online`);
      console.log("online user", data);
      onlineUsers.push(data);
    });

    /**Listen to room name and emit online users list */
    socket.on("room", (room) => {
      console.log("Room", room);
      //set chat room
      socket.room = room;
      //join chat room
      socket.join(socket.room);
      console.log("onlineusers-array", onlineUsers);
      myio.emit("online-users", onlineUsers);
    });
    /**Listen to text-message */
    socket.on("textSent", (data) => {
      console.log("Recieved text ", data);
      myio.emit("textRecieved", data);
    });
    /**Listen to disconnect event */
    socket.on("disconnect", () => {
      console.log("Client Disconnected");
      //myio.emit("logout", "user left the room");
    });
  });
};
