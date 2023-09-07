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
      <button
        style={{display: 'inline-block'}}
        onClick={handleDeleteClick}
        disabled={!selectedFlashcards?.length}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 256 256"
          height="100%"
        >
          <rect width="256" height="256" fill="none"/>
          <path d="M224,56a8,8,0,0,1-8,8h-8V208a16,16,0,0,1-16,16H64a16,16,0,0,1-16-16V64H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,56ZM88,32h80a8,8,0,0,0,0-16H88a8,8,0,0,0,0,16Z"
            fill='white'
          />
        </svg>
      </button>
    </>
  )
}