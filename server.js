const express = require("express");
const http = require("http")
const socketID = require("socket.io")
const COLORS = require("./colors")
const app = express();
const PORT = 8080
const server = http.createServer(app);
let randomWords = require('random-words');
let color = "green"
const io = socketID(server, {
    cors: {
        oragin: "*"
    }
})

let game



io.on("connection", (socket) => {
    let body = ""
    const { roomID, username, roomID2 } = socket.handshake.query
    let room = parseInt(io.sockets.adapter.rooms.get(roomID)?.size)
    const userColor = COLORS[Math.floor(Math.random() * COLORS.length)]

    socket.join(roomID)

    

    if ( room > 1) {
        io.to(socket.id).emit("room full", { roomID });
        return;
    }

    io.to(roomID).emit("room num", room)

    io.to(roomID).emit("user join", { username })

    socket.on("new message", (start) => {
        io.to(roomID).emit("new message", start)
    })

    socket.on("opt", (name) => {
        io.to(roomID).emit("opt", name)
    })


    socket.on("new letter", (letter) => {
        x = letter[letter.length - 1]
        let l = letter.toString()
        if (body[x - 1] != l[x - 1]) {
            color = "red"
        }
        else {
            color = "green"
        }
        io.to(socket.id).emit("new letter", { letter, color })
    })

    socket.on("new message", () => {
        body = randomWords({ exactly: 10, join: ' ' })
        io.to(roomID).emit("body", body)
        
    })
    socket.on("RPS", (RPS) => {
        socket.broadcast.to(roomID).emit('RPS', RPS)
    })

    

    socket.on("disconnect", () => {
        io.to(roomID).emit("user leave", { username })
        io.to(roomID).emit("room num", (room-1))
    })

})


app.get("/", (req, res) => {
    return res.send("Hello")
});

server.listen(PORT, () => console.log(`Backend listening on port: ${PORT}`));