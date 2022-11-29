import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";


const useSocketHook = (roomID, username) => {
    const navigate = useNavigate()
    const socketRef = useRef(null)
    const [messages, setMessages] = useState([])
    const [bodys, setBody] = useState()
    const [optColor, setOptColor] = useState()
    const [RPS, setRPS] = useState()
    const [opt, setOpt] = useState()
    const [room, setRoom] = useState()
    const [letter, setLetter] = useState([])
    let gamess
    function setGames(games) {
        gamess = games
    }
    

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

        socketRef.current.on("RPS", msg => {
            setRPS(msg)
        })

        socketRef.current.on("letters", letters => {
            setLetter(letters)
        })

        socketRef.current.on("opt", msg => {
            setOpt(msg)
        })

        
        socketRef.current.on("room num", room => {
            setRoom(room)
        })

        socketRef.current.on("new letter", msg => {
            
        })


        socketRef.current.on("room full", () => {
            console.log(`${roomID} is full`);
            navigate("/joinRoom");
        })
        



        socketRef.current.on("user leave", ({ username, time }) => {
            setMessages((curr) => [...curr, { time, body: `${username} has left` }])
            setRPS("")
            
            if(gamess === "race"){
                navigate('/joinRoom')
            }
            if(gamess === "RPS"){
            navigate('/RPS')
            }
        })

        return () => socketRef.current?.disconnect()
    }, [roomID, username]);


    function sendMessage(start) {
        socketRef.current.emit("new message", start)
    }

    function sendName(name){
        socketRef.current.emit("opt", name)
        
    }


    function sendRPS(RPS) {
        socketRef.current.emit("RPS", RPS)
    }

    function sendLetter(letter) {
        socketRef.current.emit("letters", letter)
    }

    return { sendLetter, sendMessage, messages, bodys, letter, RPS, sendRPS, opt, room, setGames, sendName, optColor};
};

export default useSocketHook;