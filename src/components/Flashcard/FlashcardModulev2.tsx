import { Flashcardv2 } from './Flashcardv2'
import { useFlashcards } from '../../FlashcardsContext'

export const FlashcardModulev2 = () => {
  const { flashcards } = useFlashcards()

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
    <Flashcardv2 
      key={flashcard.id}
      flashcard={flashcard}
    />
  ))
  return (
    <div className="flashcard-container">
      {cardSides}
    </div>
  )
}