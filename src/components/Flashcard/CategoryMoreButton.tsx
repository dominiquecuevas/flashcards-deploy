import Link from "next/link"
import { useFlashcards, useFlashcardsDispatch } from "../../FlashcardsContext"
import { useRouter } from "next/router"

export const CategoryMoreButton = (props) => {
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

  const handleClickRename = (event) => {
    event.preventDefault()
    dispatch({type: 'editCategory/renameToggled'})
    dispatch({type: 'editCategory/toggled'})
  }

  const handleClickDelete = async (event) => {
    event.preventDefault()
    dispatch({type: 'editCategory/toggled'})
    if (confirm(`Delete "${categoryQuery}" category and all related flashcards?`)) {
      await fetch(`/api/category?categoryId=${categoryId}`, {
        method: 'DELETE'
      })
      .then((res) => {
        if (res.ok) {
          router.push('/')
        } else {
          alert('Something went wrong.')
          throw res
        }
      })
    }
  }
  return (
    <div className="category-more">
      <input 
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