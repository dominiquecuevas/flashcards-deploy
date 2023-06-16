import Head from 'next/head'
import Layout from '../components/Layout'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { getServerSession } from 'next-auth/next'
import { GetServerSideProps } from 'next'
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import prisma from '../../lib/prisma'
import { CategoriesList } from '../components/CategoriesList'

const inter = Inter({ subsets: ['latin'] })

export const getServerSideProps: GetServerSideProps = async (context) => {
  let categoriesFeed = []
  const session = await getServerSession(context.req, context.res, authOptions)
  if (!session) {
    return {
      props: { categoriesFeed }
    }
  }
  const response = await prisma.flashcard.findMany({
    where: {
      creator: session?.user
    },
    distinct: ['category'],
    select: {
      category: true
    }
  })
  categoriesFeed = await JSON.parse(JSON.stringify(response))
  categoriesFeed = categoriesFeed.map((categoryObject) => categoryObject.category)
  return {
    props: { categoriesFeed }
  };
}

type Props = {
  categoriesFeed: string[]
}

export default function Home(props: Props) {
  const { categoriesFeed } = props

  return (
    <Layout>
      <Head>
        <title>Flashcards</title>
        <meta name="description" content="Create your own flashcards" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/robot_1f916.png" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div>
          <h2>Your Categories</h2>
          <CategoriesList categoriesFeed={categoriesFeed} />
        </div>
      </main>
    </Layout>
  )
}
