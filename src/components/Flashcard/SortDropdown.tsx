import { SyntheticEvent } from 'react'
import { useFlashcards, useFlashcardsDispatch } from '../../FlashcardsContext'

export const SortDropdown = () => {
  const { sorting } = useFlashcards()
  const dispatch = useFlashcardsDispatch()

  const handleChange = (e: SyntheticEvent) => {
    dispatch({type: 'sortFlashcards/set', payload: (e.target as HTMLInputElement).value})
  }
  return (
    <select name="sorting" value={sorting} onChange={handleChange}>
      <option value="default">-----Sort-----</option>
      <option value="alphabetically">Alphabetically</option>
      <option value="time">Time</option>
      <option value="random">Random</option>
    </select>
  )
}