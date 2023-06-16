import { useFlashcards, useFlashcardsDispatch } from '../FlashcardsContext'

export const DeleteButton = ({ fetchData }) => {
  const { selectedFlashcards, toggleCheckboxes } = useFlashcards()
  const dispatch = useFlashcardsDispatch()

  const handleSelectClick = () => {
    dispatch({type: 'selectFlashcards/toggled'})
    dispatch({type: 'selectFlashcards/cleared'})
  }

  const handleDeleteClick = async () => {
    try {
      await fetch(`/api/delete?ids=${selectedFlashcards}`, {
        method: 'DELETE'
      })
      fetchData()
      dispatch({type: 'selectFlashcards/toggled'})
      dispatch({type: 'selectFlashcards/cleared'})
    } catch (error) {
      console.error(error);
    }
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
        disabled={!selectedFlashcards.length}
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