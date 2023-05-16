import React from "react"
import { useEffect, useState } from "react"
import { GetServerSideProps } from "next"
import Layout from "../../components/Layout"
import { FlashcardModule } from '../../components/FlashcardModule'
import { FlashcardProps } from "../../components/Flashcard"

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context
  return {
    props: { params }
  };
}

type Props = {
  params: {
    category: string
  }
}

const Category = (props: Props) => {
  const { params } = props
  const [data, setData] = useState<FlashcardProps[]>([]);
  useEffect(() => {
    const fetchFlashcards = async () => {
      const response = await fetch(`/api/get?category=${params.category}`)
      const data = await response.json()
      setData(data)
    }
    fetchFlashcards().catch(console.error)
  }, [])

  return (
    <Layout>
      <div>
        <h2>{params.category}</h2>
        <FlashcardModule flashcards={data} />
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