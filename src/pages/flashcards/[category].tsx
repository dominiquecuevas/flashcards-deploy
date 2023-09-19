import React, { ReactNode, useCallback, useEffect } from "react"
import { GetServerSideProps } from "next"
import Layout from "../../components/Layout"
import { FlashcardModulev2 } from '../../components/Flashcard/FlashcardModulev2'
import { Formv2 } from "@/components/Flashcard/Formv2"
import { EditButton } from "@/components/Flashcard/EditButton"
import { DeleteButton } from "@/components/Flashcard/DeleteButton"
import { FlashcardsProvider } from "@/FlashcardsContext"
import { useFlashcards, useFlashcardsDispatch } from "../../FlashcardsContext"
import { CategoryEditForm } from "@/components/Flashcard/CategoryEditForm"
import { CategoryMoreButton } from "@/components/Flashcard/CategoryMoreButton"

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context
  const categoryQuery = query.category
  return {
    props: { 
      categoryQuery,
    }
  }
}

type Props = {
  categoryQuery: string,
}

const Category = (props: Props) => {
  const { categoryQuery } = props
  const { isFetching, category, toggleCategoryRename } = useFlashcards()
  const dispatch = useFlashcardsDispatch()
  const fetchData = useCallback(async () => {
    dispatch({type: 'editCategory/setName', payload: categoryQuery})
    dispatch({type: 'fetchFlashcards/request'})
    await fetch(`/api/flashcards?category=${categoryQuery}`)
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw res
      }
    })
    .then(data => {
      dispatch({type: 'editCategory/setCategoryId', payload: data.category?.id || ''})
      dispatch({type: 'fetchFlashcards/success', payload: data.flashcards})
    })
    .catch(error => {
      console.log(error)
      dispatch({type: 'fetchFlashcards/failure'})
    })
  }, [categoryQuery, dispatch])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <Layout>
      <div>
        <div className="category-header">
          <h2>{!toggleCategoryRename && category}</h2>
          {toggleCategoryRename && (<CategoryEditForm categoryQuery={categoryQuery} />)}
          <CategoryMoreButton categoryQuery={categoryQuery} />
        </div>
        <div style={{display: 'flex', flexWrap: 'wrap', padding: '6px', maxWidth: '860px', margin: 'auto'}}>
          <Formv2 category={category || ''} />
          <EditButton />
          <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'end'}}>
            <DeleteButton />
          </div>
        </div>
        {isFetching ? <div style={{textAlign: "center"}}>Loading...</div> : <FlashcardModulev2 />}
      </div>
    </Layout>
  )
}

Category.getLayout = function getLayout(page: ReactNode) {
  return (
    <FlashcardsProvider>
      {page}
    </FlashcardsProvider>
  )
}

export default Category