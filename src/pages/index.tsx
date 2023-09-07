import { useEffect } from 'react'
import Head from 'next/head'
import Layout from '../components/Layout'
import { useRouter } from 'next/router'

export default function Home() {
  // TODO: landing page
  const router = useRouter()
  useEffect(() => {
    router.push('/categories')
  })
  return (
    <Layout>
      <Head>
        <title>Flashcards</title>
        <meta name="description" content="Create your own flashcards" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/robot_1f916.png" />
      </Head>
      <main>
      </main>
    </Layout>
  )
}