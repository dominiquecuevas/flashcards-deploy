import { useFlashcards, useFlashcardsDispatch } from "../../FlashcardsContext"
import { useRouter } from 'next/router'
import { SyntheticEvent } from "react"

export const CategoryEditForm = (props : { categoryQuery: string }) => {
  const { categoryQuery } = props
  const { category, categoryId } = useFlashcards()
  const dispatch = useFlashcardsDispatch()
  const router = useRouter()

  const submitData = async (e: SyntheticEvent) => {
    e.preventDefault()
    dispatch({type: 'editCategory/renameToggled'})
    if ( category?.length ) {
      const body = { categoryId, category }
      await fetch('/api/category', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      .then((res) => {
        if (res.ok) {
          router.push(`/flashcards/${encodeURIComponent(category)}`)
        } else {
          throw res
        }
      })
      .catch(error => {
        console.log(error)
        if (error.status === 401) {
          router.push('/api/auth/signin')
        } else if (error.status === 409) {
          alert(`Category name "${category}" already exists`)
          dispatch({type: 'editCategory/setName', payload: categoryQuery})
        }
      })
    }
  }

  const handleCancelClick = () => {
    dispatch({type: 'editCategory/renameToggled'})
    dispatch({type: 'editCategory/setName', payload: categoryQuery})
  }

  return (
    <form 
      onSubmit={submitData} 
      style={{display: 'inline-block'}}
    >
      <input
        name="category"
        type="text"
        value={category}
        onChange={(e) => dispatch({type: 'editCategory/setName', payload: e.target.value})}
        id={categoryId}
      />
      <input 
        disabled={!category}
        type="submit" 
        value="Update" 
      />
      <input 
        type="button" 
        onClick={handleCancelClick} 
        value="Cancel" 
      />
    </form>
  )
}