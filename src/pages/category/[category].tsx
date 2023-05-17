import React from "react"
import { useState } from "react"
import { GetServerSideProps } from "next"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import prisma from '../../../lib/prisma'
import Layout from "../../components/Layout"
import { FlashcardModule } from '../../components/FlashcardModule'
import { FlashcardProps } from "../../components/Flashcard"
import { Form } from "../../components/Form"

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context
  const category = params?.category
  let feed: FlashcardProps[] = []
  const session = await getServerSession(context.req, context.res, authOptions)
  if (!session) {
    return {
      props: { category, feed }
    }
  }
  const response = await prisma.flashcard.findMany({
    where: {
      category: String(category),
      creator: session?.user
    }
  })
  feed = await JSON.parse(JSON.stringify(response))
  return {
    props: { category, feed }
  };
}

type Props = {
  category: string,
  feed: FlashcardProps[]
}

const Category = (props: Props) => {
  const { category, feed } = props
  const [data, setData] = useState(feed)
  const [sideA, setSideA] = useState("")
  const [sideB, setSideB] = useState("")

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { sideA, sideB, category };
      await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      setData([{sideA: sideA, sideB: sideB, updatedAt: new Date()}, ...data])
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