import { useFlashcards, useFlashcardsDispatch } from "../../FlashcardsContext"
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { SyntheticEvent } from "react"

export const CategoryEditForm = (props : { categoryQuery: string }) => {
  const { categoryQuery } = props
  const { category, categoryId } = useFlashcards()
  const dispatch = useFlashcardsDispatch()
  const router = useRouter()
  const { data: session } = useSession()

  const submitData = async (e: SyntheticEvent) => {
    e.preventDefault()
    if ( !session ) {
      await router.push('/api/auth/signin')
    }
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
        } else if (res.status === 401) {
          router.push('/api/auth/signin')
        } else if (res.status === 409) {
          alert(`Category name "${category}" already exists`)
          dispatch({type: 'editCategory/setName', payload: categoryQuery})
        } else {
          throw res
        }
      })
      .catch(error => {
        console.log(error)
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