import React, { useState } from 'react';

export type FlashcardProps = {
  flashcard: {
    category?: string
    createdAt?: Date
    creatorId?: string
    id: string
    sideA: string
    sideAType?: string
    sideB: string
    sideBType?: string
    updatedAt: Date
  }
  showSelect: boolean
}

export const Flashcard = (props: FlashcardProps) => {
  const [showSide, setShowSide] = useState(false)
  const {sideA, sideB, id} = props.flashcard
  const {showSelect, handleCheckedChange} = props
  const style = {
    transform: showSide ? 'rotateY(180deg)' : '',
  }
  const handleClick = () => {
    setShowSide(!showSide)
  }

  return (
    <div style={{position: 'relative'}}>
    <div className='flashcard'>
      <div className='flashcard-inner' style={style}>
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
    {showSelect && (
      <div style={{position: 'absolute', top: 10, right: 10}}>
        <input
            type="checkbox"
            value={id}
            defaultChecked={false}
            onChange={handleCheckedChange}
        />
      </div>
    )}
    </div>
  )
}