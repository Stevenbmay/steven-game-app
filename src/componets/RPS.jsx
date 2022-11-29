import { useNavigate } from "react-router-dom";
import { useState } from "react";


const RPS = () => {
    const navigate = useNavigate();
    const [roomID, setRoomID] = useState("");

    return (
        <div>
            <h2>Join a Room</h2>
            <input type="text" value={roomID} onChange={(e) => setRoomID(e.target.value)} />
            <button onClick={() => navigate(`/RPSroom/${roomID}`)}>Join Room</button>
        </div>
    )
}


export default RPS;