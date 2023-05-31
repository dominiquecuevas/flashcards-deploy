import React, { useState, FormEventHandler } from 'react';

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
  toggleCheckboxes: boolean
  handleCheckedChange: FormEventHandler
  toggleRadios: boolean
}

export const Flashcard = (props: FlashcardProps) => {
  const [showSide, setShowSide] = useState(false)
  const {sideA, sideB, id} = props.flashcard
  const {toggleCheckboxes, handleCheckedChange, toggleRadios, selectedRadio, handleOptionChange} = props
  const style = { 
    transform: showSide ? 'rotateY(180deg)' : '',
  }
  const handleClick = () => {
    if ( toggleCheckboxes || toggleRadios) {
      setShowSide(false)
    } else {
      setShowSide(!showSide)
    }
  }

  return (
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
      {toggleCheckboxes && (
      <div style={{position: 'absolute', top: 10, right: 10}}>
        <input
            type="checkbox"
            id={`checkbox-${id}`}
            value={id}
            defaultChecked={false}
            onChange={handleCheckedChange}
        />
      </div>
    )}
      {toggleRadios && (
      <div style={{position: 'absolute', top: 10, left: 10}}>
        <input
            type="radio"
            id={`radio-${id}`}
            value={id}
            data-sideA={sideA}
            data-sideB={sideB}
            checked={selectedRadio === id}
            onChange={handleOptionChange}
        />
      </div>
    )}
    </div>
  )
}