import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth } from "../../firebase.confg";
import useSocketHook from "../../Hooks/useSocket";
import './Racer.css'


const RaceRoom = () => {
    const [body, setbody] = useState("")
    const { id } = useParams()
    const Ref = useRef(null);
    const navigate = useNavigate();
    const [timer, setTimer] = useState('05');
    const [sen, setSen] = useState("")
    const [optcolor, setOptColor] = useState("green")
    const [optLetters, setOptLetters] = useState()
    const [color, setColor] = useState("green")
    const { messages, sendMessage, bodys, letter, sendLetter, setGames, room, sendName, opt } = useSocketHook(id, auth.currentUser?.displayName)
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
        setOptLetters(letter)

        if(timer == 0){
            setCount(0)
        }
        setGames("race")
        if (messages == true) {
            clearTimer(getDeadTime())
            setCount(-5)
            
            
        }
        if (messages == false) {
            
            
        }
    }, [messages]);

    function checkLetters(e) {
        let x = bodys.slice(0, e.length)
        if (e != x) {
            setColor("red")
        }
        else {
            setColor("green")
        }
    }
    function OptcheckLetters(e) {
        let x = bodys.slice(0, e.length)
        if (e != x) {
            setOptColor("red")
        }
        else {
            setOptColor("green")
        }
    }

    function checkIfDone(e){
        if (e == bodys) {
            setOptLetters("")
            sendName(`${auth.currentUser?.displayName} Won with ${Math.floor(WPM)} words per min`)
            sendMessage(false)
            setbody("")
        }

    }

function Game(){
    if(room == 1){
    if (messages == false) {
        
        return (
            <div>
                <h1>{sen}</h1>
                <button className='font30' onClick={() => {
                    sendMessage(true)
                    setbody("")
                }}>START GAME</button>

            </div>
        )
    }

    if (messages == true && timer !== "00") {
       
        return(
            <div>
        <h1>get ready</h1>
        <h1 className='font30'>{timer}</h1>
        </div>
        )
    }

    if (messages == true && timer == "00") {
        return (
            <div>
            <div className='font30'>{bodys}</div>
            <div className="race-text font30" style={{ color: color }}>{body}</div>
            <div>Opponent ↓</div>
            <div className="race-text font30" style={{ color: optcolor }}>{letter}</div>
            <input type="text" autoFocus value={body} onPaste={(e)=>{e.preventDefault()
             }} onChange={
                (e) => {
                    checkLetters(e.target.value)
                    checkIfDone(e.target.value)
                    setbody(e.target.value)
                    sendLetter(e.target.value)
                    setWPM((10 / count) * 60)
                    OptcheckLetters(letter)
                }} />
        </div>
        )
    }
}
else{
    return(
        <h2>Waiting For someone to join...</h2>
    )

}
}

return(
    <div>
        <Game/>
        <button className='font30' onClick={() =>(navigate('/race'))}>Leave</button>
    </div>
)
}


export default RaceRoom;