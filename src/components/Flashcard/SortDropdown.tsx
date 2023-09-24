import { SyntheticEvent } from 'react'
import { useFlashcards, useFlashcardsDispatch } from '../../FlashcardsContext'

export const SortDropdown = () => {
  const { sorting } = useFlashcards()
  const dispatch = useFlashcardsDispatch()

  const handleChange = (e: SyntheticEvent & {target: HTMLSelectElement}) => {
    dispatch({type: 'sortFlashcards/set', payload: e.target.value})
  }
  return (
    <select name="sorting" value={sorting} onChange={handleChange}>
      <option defaultChecked value="time">Time</option>
      <option value="alphabetically">Alphabetically</option>
    </select>
  )
}