import { Socket } from "socket.io-client";
import { auth } from "../../firebase.confg";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { io } from "socket.io-client";
import useSocketHook from "../../Hooks/useSocket";


const Race = () => {
    const navigate = useNavigate();
    const socketRef = useRef(null)
    const [roomID, setRoomID] = useState("");

    return (
        <div>
        <form>
            <h2>Join a Racing Room</h2>
            <input type="text" value={roomID} onChange={(e) => setRoomID(e.target.value)} />
            <div></div>
            <button onClick={() => {
                if(roomID){
                navigate(`/room/${roomID}race`)
                }
        }}>Join Room</button>
        </form>
        <button onClick={() =>(navigate('/menu'))}>BACK</button>
        </div>
    )
}


export default Race;