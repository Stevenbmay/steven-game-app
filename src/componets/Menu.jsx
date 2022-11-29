import { useNavigate } from "react-router-dom";
import { useState } from "react";


const Menu = () => {
    const navigate = useNavigate();
    const [roomID, setRoomID] = useState("");

    return (
        <div>
            <h2>What Game</h2>
            <button onClick={() => navigate('/joinRoom')}>Type racer</button>
            <button onClick={() =>(navigate('/RPS'))}>Rock Papar sicerce</button>
            <button onClick={() =>(navigate('/hangman'))}>Hangman</button>
        </div>
    )
}


export default Menu;