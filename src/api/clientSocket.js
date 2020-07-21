import io from "socket.io-client";
const url =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:4300/chat";

const socket = io(url);
console.log("socket", socket);

export function clientSocket() {
  console.log("emit client ping");
  socket.emit("test-client", "ping from client");
}
export function welcomeMessage(cb) {
  console.log("listen to welcome msg");
  socket.on("testconn", (data) => {
    //console.log("From Server:", data);
    cb(data);
  });
}
