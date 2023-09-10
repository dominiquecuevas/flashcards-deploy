import { useFlashcards, useFlashcardsDispatch } from '../../FlashcardsContext'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

export const DeleteButton = ({ fetchData } : { fetchData: any}) => {
  const { selectedFlashcards, toggleCheckboxes } = useFlashcards()
  const dispatch = useFlashcardsDispatch()
  const router = useRouter()
  const { data: session } = useSession()

  const handleSelectClick = () => {
    dispatch({type: 'selectFlashcards/toggled'})
    dispatch({type: 'selectFlashcards/cleared'})
  }

  const handleDeleteClick = async () => {
    if ( !session ) {
      await router.push('/api/auth/signin')
    }
    await fetch(`/api/flashcards?ids=${selectedFlashcards}`, {
      method: 'DELETE'
    })
    .then((res) => {
      if (res.ok) {
      } else {
        alert('Something went wrong.')
        throw res
      }
    })
    .catch(error => {
      console.log(error)
    })
    fetchData()
    dispatch({type: 'selectFlashcards/toggled'})
    dispatch({type: 'selectFlashcards/cleared'})
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