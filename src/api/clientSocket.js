import io from "socket.io-client";

const url =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:4300/chat";

const socket = io(url);
console.log("socket", socket);

export default function clientSocketInit() {
  socket.on("testconn", (data) => {
    console.log("From Server:", data);
    socket.emit("test-client", "client");
  });
}
