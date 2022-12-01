const express = require("express");
const http = require("http")
const socketID = require("socket.io")
const app = express();
const PORT = process.env.PORT || 8080
const server = http.createServer(app);
const socketConfig = require("./server/socket.config")
const io = socketID(server, {
    cors: {
        oragin: "*"
    }
})
socketConfig(io)
app.use(express.static(__dirname + "/build"))

if (process.env.NODE_ENV === "production") {
    app.enable("trust proxy");
    app.use((req, res, next) => {
        req.secure
            ? next()
            : res.redirect("https://" + req.headers.host + req.url);
    });
}

app.get("*", (req, res) => {
    return res.sendFile(__dirname + "/build/index.html");
});

server.listen(PORT, () => console.log(`Backend listening on port: ${PORT}`));