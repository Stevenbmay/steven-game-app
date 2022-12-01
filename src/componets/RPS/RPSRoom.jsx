import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { sendEmailVerification } from "firebase/auth";
import useSocketHook from "../../Hooks/useSocket";
import { auth } from "../../firebase.confg";
import R from './RPSImg/r.png'
import P from './RPSImg/p.png'
import S from './RPSImg/s.png'
import win from './RPSImg/win.png'
import lose from './RPSImg/lose.png'
import tied from './RPSImg/tied.PNG'
import './RPS.css'


const RPSRoom = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [selected, setSelected] = useState(false);
    const [user, setUser] = useState("");
    const [endGame, setEndGame] = useState("");
    const [countwin, setCountwin] = useState(0);
    const [optwin, setOptwin] = useState(0);
    const [optRPS, setOptRPS] = useState(undefined);
    const { RPS, sendRPS, messages, sendMessage, room, nameOpt, left, setGames, sendName } = useSocketHook(id, auth.currentUser?.displayName)

    const callback = useCallback(() => {
        if (user === RPS?.user) {
            setEndGame("tied");
        }
        else if (
            (user === "rock" && RPS?.user === "paper") ||
            (user === "paper" && RPS?.user === "scissors") ||
            (user === "scissors" && RPS?.user === "rock")
        ) {
            setEndGame('lose');
            setOptwin(optwin + 0.5)
        } else {
            setEndGame("win")
            setCountwin(countwin + 0.5)

        }
    }, [endGame])

    useEffect(() => {
        sendName(auth.currentUser?.displayName)
        setGames("RPS")
        setOptRPS(RPS)
        setEndGame()
        if (left) {
            setCountwin(0)
            setOptwin(0)
        }
        if (messages === false) {
            setUser(undefined)
            sendRPS(undefined)
            setSelected(false)
            setEndGame("")
            sendMessage(true)
        }
        if (room === null || room === 0) {
            setSelected(false)
            setEndGame("")
            setUser(undefined)
        }
        setOptRPS(RPS)
    }, [RPS, messages]);


    function Selection() {
        if (room == 1) {
            if (selected === false) {
                return (
                    <div>
                        <button className="button" onClick={() => {
                            setSelected(true)
                            setUser("rock")
                            sendRPS({ user: "rock" })
                        }}><img className="imgs" src={R} alt="rock" /></button>
                        <button className="button" onClick={() => {
                            setSelected(true)
                            setUser("paper")
                            sendRPS({ user: "paper" })
                        }}><img className="imgs" src={P} alt="paper" /></button>
                        <button className="button" onClick={() => {
                            setSelected(true)
                            setUser("scissors")
                            sendRPS({ user: "scissors" })
                        }}><img className="imgs" src={S} alt="scissors" /></button>
                    </div>


                )

            }
            function endGameimg() {
                if (endGame === "lose") {
                    return (
                        <img className="eng-img" src={lose} alt="lost" />
                    )
                }
                if (endGame === "win") {
                    return (
                        <img className="eng-img" src={win} alt="lost" />
                    )
                }
                if (endGame === "tied") {
                    return (
                        <img className="eng-img" src={tied} alt="lost" />
                    )
                }
            }

            if (selected && optRPS?.user !== undefined) {
                callback()
                return (
                    <div>
                        <h2>You {countwin} - {nameOpt} {optwin}</h2>
                        <div>{endGameimg()}</div>
                        <button className='font30' onClick={() => {
                            setUser(undefined)
                            sendRPS(undefined)
                            sendMessage(false)
                        }}>play again?</button>
                    </div>
                )
            }
            if (selected == true && optRPS?.user === undefined) {
                return (
                    <h2>Waiting for opt...</h2>
                )
            }

        }
        else {
            return (
                <h2>Waiting For someone to join...</h2>
            )

        }
    }

    return (
        <div>
            <Selection />
            <button className='font30' onClick={() => (navigate('/RPS'))}>Leave</button>
        </div>
    )
}



export default RPSRoom;