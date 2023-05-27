import { fetchData } from 'next-auth/client/_utils'
import React, { ReactEventHandler, useState } from 'react'
import { Flashcard, FlashcardProps } from './Flashcard'

export const FlashcardModule: React.FC<{flashcards: FlashcardProps[], fetchData: FunctionConstructor}> = (props) => {
  const { flashcards, fetchData } = props
  const [showSelect, setShowSelect] = useState(false)
  const [toggleDelete, setToggleDelete] = useState(true)
  const [allChecked, setAllChecked] = useState<string[]>([])

  const handleClick = () => {
    setToggleDelete(!toggleDelete)
    setShowSelect(!showSelect)
    console.log(showSelect)
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
      console.log('allChecked', allChecked)
      // const body = { ids: allChecked }
      await fetch(`/api/delete?ids=${allChecked}`, {
        method: 'DELETE'
      })
      fetchData()
      setToggleDelete(!toggleDelete)
      setAllChecked([])
      setShowSelect(!showSelect)
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
  const cardSides = flashcards.map(flashcard => <Flashcard 
    key={flashcard?.id} 
    flashcard={flashcard}
    showSelect={showSelect}
    handleCheckedChange={handleCheckedChange}
 />)
  return (
    <>
      <input type="button" onClick={handleClick} value={toggleDelete ? 'Select' : 'Cancel'} />
      {!toggleDelete && (<input type="button" disabled={!allChecked.length} value="Delete" onClick={handleDeleteClick}/>)}
      <div className="flashcard-container">
        {cardSides}
      </div>
    </>
  )
}