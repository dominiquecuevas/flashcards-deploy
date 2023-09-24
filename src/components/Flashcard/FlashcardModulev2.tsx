import { Flashcardv2 } from './Flashcardv2'
import { useFlashcards } from '../../FlashcardsContext'

export const FlashcardModulev2 = () => {
  const { flashcards, sorting } = useFlashcards()
  flashcards?.sort((a, b) => {
    if ( sorting === 'alphabetically' ) {
      if (a.sideA < b.sideA) {
        return -1;
      } else if (a.sideA > b.sideA) {
        return 1;
      } else {
        return 0;
      }
    } else if ( sorting === 'time' ) {
      if (a.updatedAt < b.updatedAt) {
        return 1;
      } else if (a.updatedAt > b.updatedAt) {
        return -1;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  })
  const cardSides = flashcards?.map(flashcard => (
    <Flashcardv2 
      key={flashcard.id}
      {...flashcard}
    />
  ))
  return (
    <div className="flashcard-container">
      {cardSides}
    </div>
  )
}