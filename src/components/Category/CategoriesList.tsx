import React, { useEffect } from 'react'
import { Category } from './Category'
import Link from 'next/link'
import { useCategories, useCategoriesDispatch } from "../../CategoriesContext"

export type Props = {
  categoriesFeed: string[]
}
export const CategoriesList = () => {
  const { categories, isFetching } = useCategories()
  const dispatch = useCategoriesDispatch()
  const fetchCategoryFeedData = () => {
    dispatch({type: 'fetchCategories/request'})
    fetch('/api/categories')
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          throw res
        }
      })
      .then(data => {
        dispatch({type: 'fetchCategories/success', payload: data})
      })
      .catch(error => {
        dispatch({type: 'fetchCategories/failure'})
      })
  }
  useEffect(() => {
    fetchCategoryFeedData()
  }, [])
  const decks = categories.map((category) => (
    <Link 
      key={category.name} 
      href={`/flashcards/${encodeURIComponent(category.name)}`}
      style={{display: 'contents'}}
    >
      <Category category={category.name}/>
    </Link>
  ))

  return (
    <div className="deck-container">
      {isFetching ? "Loading..." : decks}
    </div>
  )
}