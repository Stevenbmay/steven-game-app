import React from 'react'
import hang1 from './HangmanImgs/hang1.PNG'
import hang2 from './HangmanImgs/hang2.PNG'
import hang3 from './HangmanImgs/hang3.PNG'
import hang4 from './HangmanImgs/hang4.PNG'
import hang5 from './HangmanImgs/hang5.PNG'
import hang6 from './HangmanImgs/hang6.PNG'
import hang7 from './HangmanImgs/hang7.PNG'

const Figure = ({ wrongLetters }) => {
  const errors = wrongLetters.length
  let img
  if(errors === 0){
    img = hang1
  }
  if(errors === 1){
    img = hang2
  }
  if(errors === 2){
    img = hang3
  }
  if(errors === 3){
    img = hang4
  }
  if(errors === 4){
    img = hang5
  }
  if(errors === 5){
    img = hang6
  }
  if(errors === 6){
    img = hang7
  }

  return (
    <img src={img} alt="Hangman-img" />
  )
}

export default Figure