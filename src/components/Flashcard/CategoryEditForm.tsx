import { useFlashcards, useFlashcardsDispatch } from "../../FlashcardsContext"
import { useRouter } from 'next/router'

export const CategoryEditForm = (props) => {
  const { categoryQuery } = props
  const { category, categoryId } = useFlashcards()
  const dispatch = useFlashcardsDispatch()
  const router = useRouter()

  const submitData = async (e) => {
    e.preventDefault()
    dispatch({type: 'editCategory/renameToggled'})
    if ( category.length ) {
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
          alert('Something went wrong.')
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