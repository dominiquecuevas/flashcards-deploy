import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export const Categories: React.FC = (props) => {
  const [newCategory, setNewCategory] = useState('')
  const router = useRouter()
  const { categoriesFeed } = props

  const submitData = (e) => {
    e.preventDefault()
    router.push(`/category/${encodeURIComponent(newCategory)}`)
  }
  const categories = categoriesFeed.map((category) => (
    <li>
      <Link href={`/category/${encodeURIComponent(category)}`}>{category}</Link>
    </li>
  ))
  return (
    <>
    <ul>
      {categories}
    </ul>
    <form onSubmit={submitData}>
      <input 
        type="text" 
        placeholder="New Category"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
      />
      <input disabled={!newCategory} type="submit" value="+ Add Category" />
    </form>
    </>
  )
}