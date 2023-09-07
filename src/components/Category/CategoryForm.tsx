import { useCategories, useCategoriesDispatch } from "@/CategoriesContext"
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { SyntheticEvent } from "react"

export const CategoryForm = () => {
  const { category } = useCategories()
  const dispatch = useCategoriesDispatch()
  const router = useRouter()
  const { data: session } = useSession()

  const handleChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLTextAreaElement
    dispatch({type: 'createCategory', payload: target.value})
  }
  const submitData = async (e: SyntheticEvent) => {
    e.preventDefault()
    if ( !session ) {
      await router.push('/api/auth/signin')
    }
    try {
      const body = { category: category }
      await fetch('/api/category', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      .then(res => {
        if (res.ok) {
          router.push(`/flashcards/${encodeURIComponent(category || '')}`)
        } else {
          throw res
        }
      })
    } catch (error) {
      console.log(error)
    }
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