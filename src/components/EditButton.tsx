import { useFlashcards, useFlashcardsDispatch } from '../FlashcardsContext'

export const EditButton = ({ fetchData }) => {
  const { toggleRadios } = useFlashcards()
  const dispatch = useFlashcardsDispatch()

  const handleEditClick = () => {
    dispatch({type: 'editFlashcard/toggled'})
    dispatch({type: 'editFlashcard/cleared'})
    dispatch({type: 'createFlashcard/cleared'})
  }

  return (
    <input 
      type="button" 
      onClick={handleEditClick} 
      value={!toggleRadios ? 'Edit' : 'Cancel'} 
    />
  )
}