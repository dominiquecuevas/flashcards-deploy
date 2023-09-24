import Link from "next/link"
import { useFlashcards, useFlashcardsDispatch } from "../../FlashcardsContext"
import { useRouter } from 'next/router'
import { SyntheticEvent } from "react"

export const CategoryMoreButton = (props: { categoryQuery: string }) => {
  const { categoryQuery } = props
  const { categoryId, toggleCategoryEdit, toggleCategoryRename } = useFlashcards()
  const dispatch = useFlashcardsDispatch()
  const router = useRouter()

  const handleClick = () => {
    if ( !toggleCategoryRename ) {
      dispatch({type: 'editCategory/toggled'})
    }
    if ( toggleCategoryRename ) {
      dispatch({type: 'editCategory/renameToggled'})
      dispatch({type: 'editCategory/setName', payload: categoryQuery})
    }
  }

  const handleClickRename = async (event: SyntheticEvent) => {
    event.preventDefault()
    dispatch({type: 'editCategory/renameToggled'})
    dispatch({type: 'editCategory/toggled'})
  }

  const handleClickDelete = async (event: SyntheticEvent) => {
    event.preventDefault()
    dispatch({type: 'editCategory/toggled'})
    if (confirm(`Delete "${categoryQuery}" category and all its flashcards?`)) {
      router.push('/categories')
      fetch(`/api/category?categoryId=${categoryId}`, {
        method: 'DELETE'
      })
      .then((res) => {
        if (res.ok) {
          router.push('/categories')
        } else {
          throw res
        }
      })
      .catch(error => {
        console.log(error)
        if (error.status === 401) {
          router.push('/api/auth/signin')
        }
      })
    }
  }

  return (
    <div className="category-more">
      <input 
        name="category more button"
        type="button" 
        value="∙∙∙"
        onClick={handleClick}
      />
      {toggleCategoryEdit && (
        <div className="category-dropdown">
          <Link href="" onClick={handleClickRename}>
          <p>
            Rename
          </p>
          </Link>
          <hr style={{width : '100%'}} />
          <Link href="" onClick={handleClickDelete}>
          <p>
            Delete
          </p>
          </Link>
        </div> 
      )}
    </div>
  )
}