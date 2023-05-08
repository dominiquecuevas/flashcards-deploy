import React, { useState } from 'react';

export type FlashcardProps = {
  category: string
  createdAt: Date
  creatorId: string
  id: string
  sideA: string
  sideAType: string
  sideB: string
  sideBType: string
  updatedAt: Date
}

export const Flashcard: React.FC<{flashcard: FlashcardProps}> = (props) => {
  const [show, setShow] = useState(false)
  const {sideA, sideB} = props.flashcard
  const style = {
    transform: show ? 'rotateY(180deg)' : '',
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