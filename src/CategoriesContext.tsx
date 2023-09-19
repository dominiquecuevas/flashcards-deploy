import { createContext, ReactNode, useContext, useReducer } from 'react'

type CategoriesType = {
  categories: Array<any>
  isFetching: boolean
  hasError: boolean
  category: string
}

const CategoriesContext = createContext<CategoriesType>({} as CategoriesType)
const CategoriesDispatchContext = createContext<any>(null)

const initialCategories = {
  categories: [],
  isFetching: false,
  hasError: false,
  category: ''
}

export function CategoriesProvider ({ children } : { children: ReactNode}) {
  const [categories, dispatch] = useReducer(
    categoriesReducer,
    initialCategories
  )

  return (
    <CategoriesContext.Provider value={categories}>
      <CategoriesDispatchContext.Provider value={dispatch}>
        {children}
      </CategoriesDispatchContext.Provider>
    </CategoriesContext.Provider>
  )
}

export function useCategories() {
  return useContext(CategoriesContext)
}

export function useCategoriesDispatch() {
  return useContext(CategoriesDispatchContext)
}

function categoriesReducer(state: CategoriesType, action: any) {
  switch (action.type) {
    case 'fetchCategories/request': {
      return {
        ...state,
        isFetching: true,
        hasError: false
      }
    }
    case 'fetchCategories/success': {
      return {
        ...state,
        isFetching: false,
        categories: [...action.payload]
      }
    }
    case 'fetchCategories/failure': {
      return {
        ...state,
        isFetching: false,
        hasError: true
      }
    }
    case 'createCategory': {
      return {
        ...state,
        category: action.payload
      }
    }
    default:
      return state
  }
}