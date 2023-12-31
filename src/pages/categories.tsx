import Layout from '../components/Layout'
import { CategoriesProvider } from "@/CategoriesContext"
import { CategoriesList } from '../components/Category/CategoriesList'
import { CategoryForm } from "../components/Category/CategoryForm"
import { ReactNode } from 'react'

export default function Categories() {
  return (
    <Layout>
      <div>
        <h2>Categories</h2>
        <CategoryForm />
        <CategoriesList />
      </div>
    </Layout>
  )
}

Categories.getLayout = function getLayout(page: ReactNode) {
  return (
    <CategoriesProvider>
      {page}
    </CategoriesProvider>
  )
}