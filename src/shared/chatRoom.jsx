import { startTransition, useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { auth } from "../firebase.confg";
import useSocketHook from "../useSocket";
import ChatDisplay from "./chatDisplay";
import { v4 as uuidv4 } from "uuid";



const Room = (props) => {
    const [body, setbody] = useState("")
    const { id } = useParams();
    const bottomRef = useRef(null);
    const [sen, setSen] = useState("")
    const [color, setColor] = useState("green")
    const { messages, sendMessage, bodys, letter, sendLetter } = useSocketHook(id, auth.currentUser?.displayName)
    const [length, setlength] = useState(0)



    useEffect(() => {
        if (messages == true) {
            console.log("yes");
        }
        if (messages == false) {
            console.log("no");
        }
        console.log(messages);


        bottomRef.current?.scrollTo({
            top: bottomRef.current.scrollHeight,
            behavior: 'smooth',


        })
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



    if (messages == false) {
        return (
            <div>

                <div ref={bottomRef} style={{ width: "300px", height: "400px", border: "1px solid back", overflowY: "scroll" }}>
                    {bodys}
                </div>
                <input type="text" value={body} onChange={(e) => setbody(e.target.value)} />
                <button onClick={() => {
                    sendMessage(true)
                    setbody("")


                    console.log(sen);
                }}>send</button>

            </div>
        )
    }


    if (messages == true) {
        return (
            <div>
                <div>{bodys}</div>
                <div style={{ color: color }}>{body}</div>
                <input type="text" value={body} onChange={
                    (e) => {
                        checkLetters(e.target.value)
                        setbody(e.target.value)
                        setlength(e.target.value.length)
                        sendLetter(e.target.value, e.target.value.length)


                    }} />
                <button onClick={() => {
                    sendMessage(false)
                    setbody("")
                    console.log(sen);
                }}>send</button>
            </div>
        )
    }
}


export default Room;