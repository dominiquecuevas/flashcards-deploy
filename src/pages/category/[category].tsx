import React, { useEffect } from "react"
import { GetServerSideProps } from "next"
import Layout from "../../components/Layout"
import { FlashcardModulev2 } from '../../components/FlashcardModulev2'
import { Formv2 } from "@/components/Formv2"
import { EditButton } from "@/components/EditButton"
import { DeleteButton } from "@/components/DeleteButton"
import { useFlashcardsDispatch } from "../../FlashcardsContext"

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context
  const category = query.category
  return {
    props: { category }
  }
}

type Props = {
  category: string
}

const Category = (props: Props) => {
  const { category } = props
  const dispatch = useFlashcardsDispatch()

  const fetchData = async () => {
    const response = await fetch(`/api/get/?category=${category}`)
    const data = await response.json()
    dispatch({type: 'fetch_flashcards', payload: data})
  }

  useEffect(() => {
    fetchData()
  }, [])


  return (
    <Layout>
      <div>
        <h2>{category}</h2>
        <Formv2 category={category} fetchData={fetchData} />
        <EditButton fetchData={fetchData} />
        <DeleteButton fetchData={fetchData} />
        <FlashcardModulev2 category={category} fetchData={fetchData} />
      </div>
      <style jsx>{`
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
      `}</style>
    </Layout>
  )
}

export default Category