const express = require("express");
const http = require("http")
const socketID = require("socket.io")
const COLORS = require("./colors")
const app = express();
const PORT = 8080
const server = http.createServer(app);
let color = "green"
const io = socketID(server, {
    cors: {
        oragin: "*"
    }
})

let x


const body = "lsdkgldsbvlajfcpoashfljda"

io.on("connection", (socket) => {

    const { roomID, username } = socket.handshake.query
    let room = io.sockets.adapter.rooms.get(roomID)
    const userColor = COLORS[Math.floor(Math.random() * COLORS.length)]
    if (room.size < 1) {
        socket.join(roomID)
    }

    io.to(roomID).emit("user join", { username })

    socket.on("new message", (start) => {
        io.to(roomID).emit("new message", start)
    })

    socket.on("new letter", (letter, length) => {
        x = letter[letter.length - 1]
        let l = letter.toString()

        console.log(x);
        console.log(body[x - 1]);
        console.log(l);


        if (body[x - 1] != l[x - 1]) {
            color = "red"
        }
        else {
            color = "green"
        }
        io.to(socket.id).emit("new letter", { letter, color })
    })

    socket.on("new message", () => {
        io.to(roomID).emit("body", body)
    })

    socket.on("disconnect", () => {
        io.to(roomID).emit("user leave", { username })
    })

})


app.get("/", (req, res) => {
    return res.send("Hello")
});

server.listen(PORT, () => console.log(`Backend listening on port: ${PORT}`));