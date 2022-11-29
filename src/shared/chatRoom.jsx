import { startTransition, useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { auth } from "../firebase.confg";
import useSocketHook from "../useSocket";
import ChatDisplay from "./chatDisplay";
import { v4 as uuidv4 } from "uuid";
import Countdown from "react-countdown";




const Room = (props) => {
    const [body, setbody] = useState("")
    const { id } = useParams();
    const bottomRef = useRef(null);
    const Ref = useRef(null);
    const [timer, setTimer] = useState('05');
    const [sen, setSen] = useState("")
    const [color, setColor] = useState("green")
    const { messages, sendMessage, bodys, letter, sendLetter, setGames, room, sendName, opt } = useSocketHook(id, auth.currentUser?.displayName)
    const [length, setlength] = useState(0)
    const socketRef = useRef(null)
    const [count, setCount] = useState(0);
    const [WPM, setWPM] = useState();

    useEffect(
        () => {
            const timer = () => {
                setCount(count + 1);
            }
            const id = setInterval(timer, 1000);
            return () => clearInterval(id);
        },
        [count],

    );




    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        return {
            total, hours, minutes, seconds
        };
    }
  
  
    const startTimer = (e) => {
        let { total, hours, minutes, seconds } 
                    = getTimeRemaining(e);
        if (total >= 0) {
            setTimer(
               (seconds > 9 ? seconds : '0' + seconds)
            )
        }
    }
  
  
    const clearTimer = (e) => {
        setTimer('05');
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }
  
    const getDeadTime = () => {
        let deadline = new Date();
        deadline.setSeconds(deadline.getSeconds() + 5);
        return deadline;
    }
   

    useEffect(() => {
        
        setSen(opt)
        if(timer == 0){
            setCount(0)
        }
        setGames("race")
        if (messages == true) {
            clearTimer(getDeadTime())
            setCount(-5)
            setWPM((10 / count) * 60)
            
        }
    }, [messages]);

    function checkLetters(e) {
        let x = bodys.slice(0, e.length)
        console.log(e)
        console.log(x);
        if (e != x) {
            setColor("red")
        }
        else {
            setColor("green")
        }
    }

    function checkIfDone(e){
        if (e == bodys) {
            sendName(`${auth.currentUser?.displayName} Won with ${Math.floor(WPM)} words per min`)
            sendMessage(false)
        }

    }


    if(room == 1){
    if (messages == false) {
        
        return (
            <div>
                <div>{sen}</div>
                <button onClick={() => {
                    sendMessage(true)
                    setbody("")
                }}>Start</button>

            </div>
        )
    }

    if (messages == true && timer !== "00") {
       
        return(
        <div>get ready {timer}</div>
        )
    }


    if (messages == true && timer == "00") {
        return (
            <div>
            <div>{bodys}</div>
            <div style={{ color: color }}>{body}</div>
            <input type="text" autoFocus value={body} onChange={
                (e) => {
                    checkLetters(e.target.value)
                    checkIfDone(e.target.value)
                    setbody(e.target.value)
                    setlength(e.target.value.length)
                    sendLetter(e.target.value, e.target.value.length)


                }} />
            <button onClick={() => {
                sendMessage(false)
                setbody("")
            }}>send</button>
        </div>
        )
    }
}
else{
    return(
        <div>Waiting For someone to join</div>
    )

}
}


export default Room;