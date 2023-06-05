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
        // disabled={toggleRadios} 
      />
      <input type="button" 
        style={{display: selectedFlashcards.length ? 'inline-block' : 'none'}}
        value="Delete" 
        onClick={handleDeleteClick}
      />
    </>


  )
}