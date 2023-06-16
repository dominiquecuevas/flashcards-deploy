import React, { useState } from 'react'
import { Category } from './Category'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useFlashcardsDispatch } from "../FlashcardsContext"

export type Props = {
  categoriesFeed: string[]
}

export const CategoriesList = (props: Props) => {
  const [newCategory, setNewCategory] = useState('')
  const router = useRouter()
  const { categoriesFeed } = props
  const dispatch = useFlashcardsDispatch()

  const submitData = (e: React.SyntheticEvent) => {
    e.preventDefault()
    router.push(`/category/${encodeURIComponent(newCategory)}`)
  }

  const decks = categoriesFeed.map((category) => (
    <Link 
      key={category} 
      href={`/category/${encodeURIComponent(category)}`}
      onClick={dispatch({type: 'fetchFlashcards/clear'})}
      style={{display: 'contents'}}
    >
      <Category category={category}/>
    </Link>
  ))
  return (
    <>
    <div className="deck-container">
      {decks}
    </div>
    <form 
      onSubmit={submitData}
      style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '6px'}}
    >
      <input 
        type="text" 
        placeholder="New Category"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        style={{flexGrow: 1, maxWidth: '300px'}}
      />
      <input disabled={!newCategory} type="submit" value="+ Add Category" />
    </form>
    </>
  )
}