import { Socket } from "socket.io-client";
import { auth } from "../firebase.confg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


const JoinRoom = () => {
    const navigate = useNavigate();
    const [roomID, setRoomID] = useState("");

    return (
        <div>
            <h2>Join a Room</h2>
            <input type="text" value={roomID} onChange={(e) => setRoomID(e.target.value)} />
            <button onClick={() => navigate(`/room/${roomID}`)}>Join Room</button>
        </div>
    )
}


export default JoinRoom;