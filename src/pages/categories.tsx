import Layout from '../components/Layout'
import { CategoriesProvider } from "@/CategoriesContext"
import { CategoriesList } from '../components/Category/CategoriesList'
import { CategoryForm } from "../components/Category/CategoryForm"

export default function Categories() {
  return (
    <Layout>
      <div>
        <h2>Your Categories</h2>
        <CategoryForm />
        <CategoriesList />
      </div>
    </Layout>
  )
}

Categories.getLayout = function getLayout(page) {
  return (
    <CategoriesProvider>
      {page}
    </CategoriesProvider>
  )
}