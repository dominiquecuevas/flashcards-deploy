import { useState, SyntheticEvent } from 'react'
import { useFlashcards, useFlashcardsDispatch } from '../../FlashcardsContext'

export type FlashcardProps = {
  category?: string
  createdAt?: Date
  creatorId?: string
  id: string
  sideA: string
  sideB: string
  updatedAt: Date
}

export const Flashcardv2 = (props: FlashcardProps) => {
  const [showSide, setShowSide] = useState(false)
  const { toggleCheckboxes, toggleRadios, selectedRadioId } = useFlashcards()
  const dispatch = useFlashcardsDispatch()
  const { sideA, sideB, id } = props
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

  const handleCheckedChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement
    if (target.checked) {
      dispatch({type: 'selectFlashcards/added', payload: target.value})
    } else {
      dispatch({type: 'selectFlashcards/removed', payload: target.value})
    }
  }

  const handleRadioChange = (e: SyntheticEvent) => {
    e.stopPropagation()
    const target = e.target as HTMLInputElement
    dispatch({type: 'editFlashcard/selected', payload: target.value})
    dispatch({type: 'createFlashcard/setSideA', payload: target.getAttribute('data-sideA')})
    dispatch({type: 'createFlashcard/setSideB', payload: target.getAttribute('data-sideB')})
    dispatch({type: 'flashcardsFormToggle/toggled', payload: true})
    dispatch({type: 'editFlashcard/toggled', payload: false})
  }

  return (
    <div className='flashcard' style={{ zIndex: toggleRadios ? 2 : undefined }}>
      <label 
        htmlFor={toggleRadios ? `radio-${id}` : `checkbox-${id}`}
      >
        <div className='flashcard-inner' style={style} onClick={handleClick} >
          <div
            className='flashcard-sideA' 
          >
            {sideA}
          </div>
          <div 
            className='flashcard-sideB' 
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
                data-sidea={sideA}
                data-sideb={sideB}
                checked={selectedRadioId === id}
                onChange={handleRadioChange}
            />
          </div>
        )}
      </label>
    </div>
  )
}