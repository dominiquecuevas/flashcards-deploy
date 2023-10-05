import Link from "next/link"
import { useFlashcards, useFlashcardsDispatch } from "../../FlashcardsContext"
import { useRouter } from 'next/router'
import { SyntheticEvent, useRef } from "react"
import { useWindowListener } from "../../../utilities"

export const CategoryMoreButton = (props: { categoryQuery: string }) => {
  const { categoryQuery } = props
  const { categoryId, toggleMoreMenu } = useFlashcards()
  const dispatch = useFlashcardsDispatch()
  const router = useRouter()
  const ref = useRef<any>(null)

  useWindowListener('click', (event) => {
    if ( toggleMoreMenu && ref.current.contains(event.target) ) {
      dispatch({type: 'moreMenu/toggled'})
    }
  })

  const handleClick = async (event: SyntheticEvent) => {
    event.stopPropagation()
    dispatch({type: 'moreMenu/toggled'})
  }

  const handleClickNew = async (event: SyntheticEvent) => {
    event.preventDefault()
    event.stopPropagation()
    dispatch({type: 'flashcardsFormToggle/toggled', payload: true})
    dispatch({type: 'moreMenu/toggled'})
  }

  const handleClickEdit = async (event: SyntheticEvent) => {
    event.preventDefault()
    event.stopPropagation()
    dispatch({type: 'editFlashcard/toggled', payload: true})
    dispatch({type: 'editFlashcard/cleared'})
    dispatch({type: 'createFlashcard/cleared'})
    dispatch({type: 'moreMenu/toggled'})
  }

  const handleClickRenameCategory = async (event: SyntheticEvent) => {
    event.preventDefault()
    event.stopPropagation()
    dispatch({type: 'editCategory/renameToggled'})
    dispatch({type: 'moreMenu/toggled'})
  }

  const handleClickDeleteCategory = async (event: SyntheticEvent) => {
    event.preventDefault()
    event.stopPropagation()
    dispatch({type: 'moreMenu/toggled'})
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
        style={{ position: 'relative' }}
      />
      {toggleMoreMenu && (
        <>
          <div className="backdrop" ref={ref}></div>
          <div className="category-dropdown">
            <Link href="" onClick={handleClickNew}>
              New
            </Link>
            <hr style={{width : '100%'}} />
            <Link href="" onClick={handleClickEdit}>
              Edit
            </Link>
            <hr style={{width : '100%'}} />
            <Link href="" onClick={handleClickRenameCategory}>
              Rename Category
            </Link>
            <hr style={{width : '100%'}} />
            <Link href="" onClick={handleClickDeleteCategory}>
              Delete Category
            </Link>
          </div>
        </>
      )}
    </div>
  )
}