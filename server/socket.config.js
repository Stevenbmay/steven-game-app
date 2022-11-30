function socketConfig(io){
    let randomWords = require('random-words');
    let body = ""

    io.on("connection", (socket) => {
        let body = ""
            const { roomID, username, } = socket.handshake.query
    let room = parseInt(io.sockets.adapter.rooms.get(roomID)?.size)

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
        socket.broadcast.to(roomID).emit("opt name", name)
    })

    socket.on("new message", () => {
        body = randomWords({ exactly: 10, join: ' ' })
        io.to(roomID).emit("body", body)
        
    })

    socket.on("RPS", (RPS) => {
        socket.broadcast.to(roomID).emit('RPS', RPS)
    })

    socket.on("letters", (letters) => {
        socket.broadcast.to(roomID).emit('letters', letters)
    })

    

    socket.on("disconnect", () => {
        io.to(roomID).emit("user leave", { username })
        io.to(roomID).emit("room num", (room-1))
    })
})
}

module.exports = socketConfig