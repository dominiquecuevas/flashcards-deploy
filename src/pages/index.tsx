import Head from 'next/head'
import Layout from '../components/Layout'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { CategoriesProvider } from "@/CategoriesContext"
import { CategoriesList } from '../components/Category/CategoriesList'
import { CategoryForm } from "../components/Category/CategoryForm"

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
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
          <CategoriesList />
          <CategoryForm />
        </div>
      </main>
    </Layout>
  )
}

Home.getLayout = function getLayout(page) {
  return (
    <CategoriesProvider>
      {page}
    </CategoriesProvider>
  )
}