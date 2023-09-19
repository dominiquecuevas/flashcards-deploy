import Head from 'next/head'
import Layout from '../components/Layout'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

export default function Home() {
  const { data: session } = useSession()
  const router = useRouter()
  const handleClick = () => {
    if ( session ) {
      router.push('/categories')
    } else {
      router.push('/api/auth/signin')
    }
  }
  return (
    <Layout>
      <Head>
        <title>Flashcards</title>
        <meta 
          name="description" 
          content="Get on top of your study sessions with digital flashcards. 
                  Create flashcards to start learning and memorizing." 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/robot_1f916.png" />
      </Head>
      <main>
        <div className='landing-div'>
          <h1>Challege accepted</h1>
          <br/>
          <p>
            Get on top of your study sessions with digital flashcards. 
            Create flashcards to start learning and memorizing. 
          </p>
          <br/>
          <button onClick={handleClick}>
            Get Started
          </button>
        </div>
      </main>
    </Layout>
  )
}