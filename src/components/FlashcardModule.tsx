import React, { useState } from 'react'
import { Flashcard, FlashcardProps } from './Flashcard'

export const FlashcardModule = (props) => {
  const { flashcards, fetchData, toggleRadios, selectedRadio, handleOptionChange } = props
  const [toggleCheckboxes, setToggleCheckboxes] = useState(false)
  const [allChecked, setAllChecked] = useState<string[]>([])
  // TODO: undo feature

  const handleSelectClick = () => {
    setToggleCheckboxes(!toggleCheckboxes)
    setAllChecked([])
  }
  const handleCheckedChange = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement
    if (target.checked) {
      setAllChecked([...allChecked, target.value])
    } else {
      setAllChecked(allChecked.filter((id) => id !== target.value))
    }
  }

  const handleDeleteClick = async () => {
    try {
      await fetch(`/api/delete?ids=${allChecked}`, {
        method: 'DELETE'
      })
      fetchData()
      setAllChecked([])
    } catch (error) {
      console.error(error);
    }
  }

  flashcards.sort((a, b) => {
    if (a.updatedAt < b.updatedAt) {
      return 1;
    }
    if (a.updatedAt > b.updatedAt) {
      return -1;
    }
    return 0;
  })
  const cardSides = flashcards.map(flashcard => (
    <label htmlFor={toggleRadios ? `radio-${flashcard.id}` : `checkbox-${flashcard.id}`}>
      {/* <label htmlFor={`checkbox-${flashcard.id}`}> */}
        <Flashcard 
            key={flashcard?.id} 
            flashcard={flashcard}
            toggleCheckboxes={toggleCheckboxes}
            handleCheckedChange={handleCheckedChange}
            toggleRadios={toggleRadios}
            selectedRadio={selectedRadio}
            handleOptionChange={handleOptionChange}
        />
      </label>
    // </label>
  ))
  return (
    <>
      <input type="button" onClick={handleSelectClick} value={!toggleCheckboxes ? 'Select' : 'Cancel'} disabled={toggleRadios} />
      <input type="button" disabled={!allChecked.length} value="Delete" onClick={handleDeleteClick}/>
      <div className="flashcard-container">
        {/* {cardSides} */}
      </div>
    </>
  )
}