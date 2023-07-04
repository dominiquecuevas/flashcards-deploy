import { useCategories, useCategoriesDispatch } from "@/CategoriesContext"
import { useRouter } from 'next/router'

export const CategoryForm = () => {
  const { category } = useCategories()
  const dispatch = useCategoriesDispatch()
  const router = useRouter()

  const handleChange = (e) => {
    dispatch({type: 'createCategory', payload: e.target.value})
  }
  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = { category: category }
      await fetch('/api/category', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
    } catch (error) {
      console.log(error)
    }
    router.push(`/flashcards/${encodeURIComponent(category)}`)
  }
  return (
    <form 
      onSubmit={submitData}
      style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '6px'}}
    >
      <input 
        type="text" 
        placeholder="New Category"
        value={category}
        onChange={handleChange}
        style={{flexGrow: 1, maxWidth: '300px'}}
      />
      <input 
        disabled={!category}
        type="submit" 
        value="+ Add Category" />
    </form>
  )
}