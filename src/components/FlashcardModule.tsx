import { Flashcard } from './Flashcard'

export const FlashcardModule = (props) => {
  const { flashcards } = props
  const cardSides = flashcards.map(flashcard => <Flashcard key={flashcard.sideA} flashcard={flashcard} />)
  return (
    <div className=".flashcard-container">
      {cardSides}
    </div>
  )
}