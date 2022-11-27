import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";


const useSocketHook = (roomID, username) => {
    const navigate = useNavigate()
    const socketRef = useRef(null)
    const [messages, setMessages] = useState([])
    const [bodys, setBody] = useState()
    const [letter, setLetter] = useState([])

    useEffect(() => {
        if (!roomID || !username) return
        socketRef.current = io("http://localhost:8080", { query: { username, roomID } })


        socketRef.current.on("room full", ({ roomID }) => {
            navigate("/joinroom")
        })
        socketRef.current.on("new message", msg => {
            setMessages(msg)
        })

        socketRef.current.on("body", msg => {
            setBody(msg)
        })

        socketRef.current.on("new letter", msg => {
            setLetter((curr) => [...curr, msg])
        })

        socketRef.current.on("banned", msg => {
            setMessages((curr) => [...curr, msg])
        })



        socketRef.current.on("user leave", ({ username, time }) => {
            setMessages((curr) => [...curr, { time, body: `${username} has left` }])
        })

        return () => socketRef.current?.disconnect()
    }, [roomID, username]);


    function sendMessage(start) {
        socketRef.current.emit("new message", start)
    }

    function sendLetter(letter, length) {
        socketRef.current.emit("new letter", [letter, length])
    }
    return { sendLetter, sendMessage, messages, bodys, letter };
};

export default useSocketHook;