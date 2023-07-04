import React, { useEffect } from "react"
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
  const fetchData = async () => {
    dispatch({type: 'editCategory/setName', payload: categoryQuery})
    await fetch(`/api/category/?category=${categoryQuery}`)
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          alert('Something went wrong.')
          throw res
        }
      })
      .then(data => {
        if ( data ) {
          dispatch({type: 'editCategory/setCategoryId', payload: data.id})
          return data.id
        } else {
          throw res
        }
      })
      .then(categoryId => {
        dispatch({type: 'fetchFlashcards/request'})
        fetch(`/api/flashcards/?categoryId=${categoryId}`)
          .then(res => {
            if (res.ok) {
              return res.json()
            } else {
              alert('Something went wrong.')
              throw res
            }
          })
        .then(data => {
          dispatch({type: 'fetchFlashcards/success', payload: data})
        })
        .catch(error => {
          console.log(error)
          dispatch({type: 'fetchFlashcards/failure'})
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Layout>
      <div>
        <div className="category-header">
          <h2>{!toggleCategoryRename && categoryQuery}</h2>
          {toggleCategoryRename && (<CategoryEditForm categoryQuery={categoryQuery} />)}
          <CategoryMoreButton categoryQuery={categoryQuery} />
        </div>
        <div style={{display: 'flex', flexWrap: 'wrap', padding: '6px', maxWidth: '860px', margin: 'auto'}}>
          <Formv2 category={category} fetchData={fetchData} />
          <EditButton />
          <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'end'}}>
            <DeleteButton fetchData={fetchData} />
          </div>
        </div>
        {isFetching ? <div style={{textAlign: "center"}}>Loading...</div> : <FlashcardModulev2 />}
      </div>
    </Layout>
  )
}

Category.getLayout = function getLayout(page) {
  return (
    <FlashcardsProvider>
      {page}
    </FlashcardsProvider>
  )
}

export default Category