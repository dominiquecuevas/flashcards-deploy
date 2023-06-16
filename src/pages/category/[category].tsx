import React, { useEffect } from "react"
import { GetServerSideProps } from "next"
import Layout from "../../components/Layout"
import { FlashcardModulev2 } from '../../components/FlashcardModulev2'
import { Formv2 } from "@/components/Formv2"
import { EditButton } from "@/components/EditButton"
import { DeleteButton } from "@/components/DeleteButton"
import { useFlashcards, useFlashcardsDispatch } from "../../FlashcardsContext"

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context
  const category = query.category
  return {
    props: { 
      category,
    }
  }
}

type Props = {
  category: string,
  initialFlashcards: Array<null>
}

const Category = (props: Props) => {
  const { category } = props
  const { flashcards, isFetching } = useFlashcards()
  const dispatch = useFlashcardsDispatch()

  const fetchData = async () => {
    dispatch({type: 'fetchFlashcards/request'})
    fetch(`/api/get/?category=${category}`)
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
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
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Layout>
      <div>
        <h2>{category}</h2>
        <div style={{display: 'flex', flexWrap: 'wrap', padding: '6px', maxWidth: '860px', margin: 'auto'}}>
          <Formv2 category={category} fetchData={fetchData} />
          <EditButton fetchData={fetchData} />
          <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'end'}}>
            <DeleteButton fetchData={fetchData} />
          </div>
        </div>
        {isFetching && flashcards.length === 0 ? <div style={{textAlign: "center"}}>Loading...</div> : <FlashcardModulev2 />}
      </div>
      {/* <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style> */}
    </Layout>
  )
}

export default Category