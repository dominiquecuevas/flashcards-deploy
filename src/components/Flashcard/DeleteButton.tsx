import { useFlashcards, useFlashcardsDispatch } from '../../FlashcardsContext'
import { useRouter } from 'next/router'

export const DeleteButton = () => {
  const { selectedFlashcards, toggleCheckboxes } = useFlashcards()
  const dispatch = useFlashcardsDispatch()
  const router = useRouter()

  const handleSelectClick = () => {
    dispatch({type: 'selectFlashcards/toggled'})
    dispatch({type: 'selectFlashcards/cleared'})
  }

  const handleDeleteClick = async () => {
    if (confirm('Delete selected flashcards?')) {
      let deleteFlashcards = [...selectedFlashcards]
      dispatch({type: 'deleteFlashcards/removed', payload: deleteFlashcards})
      dispatch({type: 'selectFlashcards/toggled'})
      dispatch({type: 'selectFlashcards/cleared'})
      await fetch(`/api/flashcards?ids=${deleteFlashcards}`, {
        method: 'DELETE'
      })
      .then((res) => {
        if (res.status === 401) {
          router.push('/api/auth/signin')
        } else if (!res.ok) {
          throw res
        }
      })
      .catch(error => {
        console.log(error)
      })
    }
  }
  
  return (
    <>
      <input 
        type="button" 
        onClick={handleSelectClick} 
        value={!toggleCheckboxes ? 'Select' : 'Cancel'} 
      />
      <input
        type="button"
        value="Delete"
        onClick={handleDeleteClick}
        disabled={!selectedFlashcards?.length}
      />
    </>
  )
}