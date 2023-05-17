import React from "react"
import { useEffect, useState } from "react"
import { GetServerSideProps } from "next"
import Layout from "../../components/Layout"
import { FlashcardModule } from '../../components/FlashcardModule'
import { FlashcardProps } from "../../components/Flashcard"
import { Form } from "../../components/Form"

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
  const [data, setData] = useState<FlashcardProps[]>([])
  const [sideA, setSideA] = useState("")
  const [sideB, setSideB] = useState("")
  useEffect(() => {
    const fetchFlashcards = async () => {
      const response = await fetch(`/api/get?category=${params.category}`)
      const data = await response.json()
      setData(data)
    }
    fetchFlashcards().catch(console.error)
  }, [])
  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { sideA, sideB, category: params.category };
      await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      setData([{sideA: sideA, sideB: sideB}, ...data])
      setSideA("")
      setSideB("")
      // await Router.push('/');
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Layout>
      <div>
        <h2>{params.category}</h2>
        <Form 
          sideA={sideA}
          setSideA={setSideA}
          sideB={sideB}
          setSideB={setSideB}
          onSubmit={submitData}
        />
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