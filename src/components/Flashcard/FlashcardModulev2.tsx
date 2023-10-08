import { Flashcardv2 } from './Flashcardv2'
import { useFlashcards, useFlashcardsDispatch } from '../../FlashcardsContext'

export const FlashcardModulev2 = () => {
  const { flashcards, sorting, toggleRadios } = useFlashcards()
  const dispatch = useFlashcardsDispatch()

  flashcards?.sort((a, b) => {
    if ( sorting === 'alphabetically' ) {
      if (a.sideA.toLocaleLowerCase() < b.sideA.toLocaleLowerCase()) {
        return -1;
      } else if (a.sideA.toLocaleLowerCase() > b.sideA.toLocaleLowerCase()) {
        return 1;
      } else {
        return 0;
      }
    } else if ( sorting === 'time' || sorting === 'default') {
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

  const handleClick = () => {
    dispatch({type: 'editFlashcard/toggled', payload: false})
  }
  return (
    <div 
      className="flashcard-container"
    >
      {toggleRadios && <div className="backdrop" onClick={handleClick}>
        </div>}
      {cardSides}
    </div>
  )
}