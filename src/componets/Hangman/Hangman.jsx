import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Figure from './Figure';
import './hangman.css'
const words = ['hypnothize', 'programming', 'competition', 'communication' , 'programmer', 'control', 'facility', 'director', 'package', 'hangman'];
let selectedWord = words[Math.floor(Math.random() * words.length)];

function Hangman() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([])
  const [winLose, setWinLose] = useState("");
  const navigate = useNavigate();

  function checkWin() {
    let winlose = "win"
    selectedWord.split('').forEach(letter => {
      if(!correctLetters.includes(letter)){
        winlose = ""
      }
    })
    if(wrongLetters.length === 6) {
        winlose = "lose"
        
    }
    setWinLose(winlose)
  }

  function Word(){
    return (
      <div className="word">
        {selectedWord.split('').map((letter, i) => {
          return (
            <span className="letter" key={i}>
              {correctLetters.includes(letter) ? letter : ''}
            </span>
          )
        })}
      </div>
    )
  }

  function WrongLetters(){
    return (
      <div className='wrong-letters'>
        <div>
          {wrongLetters.length > 0 && 
            <p className='wrong-letters-p'>Wrong Guesses</p>
          }
          {wrongLetters.map((letter, i) =>
          <span className='wrong-letters-span' key={i}>{letter}</span>).reduce((prev, curr) => prev === null ? [curr] : [prev, ', ', curr], null)}
          </div>
      </div>
    )
  }



  function playAgain() {
    const random = Math.floor(Math.random() * words.length);
    selectedWord = words[random];
    setPlayable(true);
    setCorrectLetters([]);
    setWrongLetters([]);
    setWinLose("")
  }
  useEffect(()=>{
    checkWin()
  })
  


  function EndMessage(){
    let endMessage = ''
    if(winLose == 'win' ) {
      endMessage = 'You won!'
      setPlayable(false)

    } else if(winLose === 'lose' ) {
      endMessage = `You lost. The word was: ${selectedWord}`;
      setPlayable(false)
    }

    if(playable == false){
  
    return (
      <div>
        <div>
          <h2>{endMessage}</h2>
          <button onClick={playAgain}>Play Again</button>
        </div>
      </div>
    )
  }
  }

  useEffect(() => {
    const handleKeydown = event => {
      const { key, keyCode } = event;
      
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase()

        if (selectedWord.includes(letter)) {

          if (!correctLetters.includes(letter)) {
            setCorrectLetters(currentLetters => [...currentLetters, letter]);
            return
          } 
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(currentLetters => [...currentLetters, letter])
            return
          } 
        }
      }
    }
    window.addEventListener('keydown', handleKeydown);


    return () => window.removeEventListener('keydown', handleKeydown);
  }, [correctLetters, wrongLetters, playable]);



  return (
    <>
    <h1>Hangeman</h1>
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <Word/>
        <WrongLetters/>
      </div>
      <EndMessage/>
      <button className='font30' onClick={() =>(navigate('/menu'))}>Leave</button>
    </>
  );
}

export default Hangman;