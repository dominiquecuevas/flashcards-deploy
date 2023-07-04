import { createContext, useContext, useReducer} from 'react'

const CategoriesContext = createContext(null)
const CategoriesDispatchContext = createContext(null)

const initialCategories = {
  categories: [],
  isFetching: false,
  hasError: false,
  category: ''
}

export function CategoriesProvider ({ children }) {
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

function categoriesReducer(state, action) {
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
    case 'fetchCategories/failed': {
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