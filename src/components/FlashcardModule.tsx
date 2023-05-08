import React from 'react'
import { Flashcard, FlashcardProps } from './Flashcard'

export const FlashcardModule: React.FC<{flashcards: FlashcardProps[]}> = (props) => {
  const { flashcards } = props
  flashcards.sort((a, b) => {
    if (a.updatedAt < b.updatedAt) {
      return 1;
    }
    if (a.updatedAt > b.updatedAt) {
      return -1;
    }
    return 0;
  })
  const cardSides = flashcards.map(flashcard => <Flashcard key={flashcard.sideA} flashcard={flashcard} />)
  return (
    <div className=".flashcard-container">
      {cardSides}
    </div>
  )
}