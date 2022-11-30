import { useNavigate } from "react-router-dom";
import { useState } from "react";


const RPS = () => {
    const navigate = useNavigate();
    const [roomID, setRoomID] = useState("");

    return (
        <div>
        <form>
            <h2>Join a Rock Paper Scissors Room</h2>
            <input type="text" value={roomID} onChange={(e) => setRoomID(e.target.value)} />
            <div></div>
            <button onClick={() => navigate(`/RPSroom/${roomID}`)}>Join Room</button>
        </form>
        <button onClick={() =>(navigate('/menu'))}>BACK</button>
        </div>
    )
}


export default RPS;