import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Race = () => {
    const navigate = useNavigate();
    const [roomID, setRoomID] = useState("");

    return (
        <div>
            <form>
                <h2>Join a Racing Room</h2>
                <input type="text" value={roomID} onChange={(e) => setRoomID(e.target.value)} />
                <div></div>
                <button onClick={() => {
                    if (roomID) {
                        navigate(`/room/${roomID}race`)
                    }
                }}>Join Room</button>
            </form>
            <button onClick={() => (navigate('/menu'))}>BACK</button>
        </div>
    )
}


export default Race;