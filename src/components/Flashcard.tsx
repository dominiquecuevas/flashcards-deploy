import React, { useState } from 'react';

export const Flashcard = (props) => {
  const [show, setShow] = useState(false)
  const {sideA, sideB} = props.flashcard
  const style = {
    transform: show ? 'rotateY(180deg)' : null,
  }
  const handleClick = () => {
    setShow(!show)
  }
  return (
    <div className='flashcard'>
      <div className='flashcard-parent' style={style}>
        <div
            className='flashcard-sideA' 
            onClick={handleClick}
        >
          {sideA}
        </div>
        <div 
            className='flashcard-sideB' 
            onClick={handleClick}
        >
          {sideB}
        </div>
      </div>
    </div>
  )
}