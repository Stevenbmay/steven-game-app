import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { sendEmailVerification } from "firebase/auth";
import useSocketHook from "../useSocket";
import { auth } from "../firebase.confg";


const RPSRoom = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [selected, setSelected] = useState(false);
    const [user, setUser] = useState("");
    const [endGame, setEndGame] = useState("");
    const [optRPS, setOptRPS] = useState(undefined);
    const { RPS, sendRPS, messages, sendMessage, room, setGames } = useSocketHook(id, auth.currentUser?.displayName)
    useEffect(() => {
        setGames("RPS")
        if (messages == true && optRPS !== undefined ) {
            setOptRPS(undefined)
            sendRPS(undefined)
            sendMessage(false)
            setSelected(false)
            setEndGame("")
            setUser()
        }
        if(room == null || room == 0){
            setSelected(false)
            setEndGame("")
            setUser("")
        }
        if(user !== ""){
            sendRPS({user})
        }

        
        setOptRPS(RPS)
    
        if (user === RPS?.user) {
            setEndGame("tied");
          } 
          else if (
            (user === "rock" && RPS?.user === "paper") ||
            (user === "paper" && RPS?.user === "scissors") ||
            (user === "scissors" && RPS?.user === "rock")
          ) {
            setEndGame("lose");
          } else {
            setEndGame("win");
          }
        
    }, [RPS, messages]);

    
function Selection(){
if(room == 1){
    if(selected == false){
    return (
        <div>
             <button onClick={() => {
                setSelected(true)
                setUser("rock")
                sendRPS("rock")}}>Rock</button>
             <button onClick={() => {
                setSelected(true)
                setUser("paper")
                sendRPS("paper")}}>Papar</button>
             <button onClick={() => {
                setSelected(true)
                setUser("scissors")
                sendRPS("scissors")}}>scissors</button>
        </div>

        
    )
    
}
if(selected == true && optRPS?.user == undefined){
    return(
    <div>Waiting for opt</div>
    )
}

}
else{
    return(
        <div>Waiting For someone to join</div>
    )

}
}
if(selected == true &&  optRPS?.user !== undefined){
    return(
        <div>
        <div>{endGame}</div>
        <button onClick={() => {
            setUser({})
            setSelected(false)
            sendRPS(undefined)
            setOptRPS(undefined)
            sendMessage(true)
           }}>play agien</button>
           <button onClick={() =>(navigate('/RPS'))}>Leave</button>
            </div>

    )
}
return(
    <div>
        <Selection/>
        <button onClick={() =>(navigate('/RPS'))}>Leave</button>
    </div>
)
}



export default RPSRoom;