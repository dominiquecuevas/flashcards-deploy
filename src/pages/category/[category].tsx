import React, { useEffect, useState } from "react"
import { GetServerSideProps, GetStaticProps } from "next"
import Layout from "../../components/Layout"
import { FlashcardModule } from '../../components/FlashcardModule'
import { FlashcardProps } from "../../components/Flashcard"
import { Form } from "../../components/Form"

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
  const [data, setData] = useState([])
  const [sideA, setSideA] = useState("")
  const [sideB, setSideB] = useState("")

  const fetchData = async () => {
    console.log('fetchData category', category)
    const response = await fetch(`/api/get/?category=${category}`)
    const dataCategories = await response.json()
    setData(dataCategories)
  }

  useEffect(() => {
    console.log('category', category)
    fetchData()
  }, [])

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { sideA, sideB, category: category };
      await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      fetchData()
      setSideA("")
      setSideB("")
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Layout>
      <div>
        <h2>{category}</h2>
        <Form 
          sideA={sideA}
          setSideA={setSideA}
          sideB={sideB}
          setSideB={setSideB}
          onSubmit={submitData}
        />
        <FlashcardModule flashcards={data} fetchData={fetchData} />
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