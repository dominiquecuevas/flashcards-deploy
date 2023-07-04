import { createContext, useContext, useReducer} from 'react'

const FlashcardsContext = createContext(null)
const FlashcardsDispatchContext = createContext(null)

const initialFlashcards = {
  category: '',
  categoryId: '',
  toggleCategoryEdit: false,
  toggleCategoryRename: false,
  flashcards: [],
  isFetching: false,
  hasError: false,
  selectedFlashcards: [],
  toggleCheckboxes: false,
  sideA: '',
  sideB: '',
  toggleRadios: false,
  selectedRadioId: ''
}

export function FlashcardsProvider ({ children }) {
  const [flashcards, dispatch] = useReducer(
    flashcardsReducer,
    initialFlashcards
  )

  return (
    <FlashcardsContext.Provider value={flashcards}>
      <FlashcardsDispatchContext.Provider value={dispatch}>
        {children}
      </FlashcardsDispatchContext.Provider>
    </FlashcardsContext.Provider>
  )
}

export function useFlashcards() {
  return useContext(FlashcardsContext)
}

export function useFlashcardsDispatch() {
  return useContext(FlashcardsDispatchContext)
}

function flashcardsReducer(state, action) {
  switch (action.type) {
    case 'editCategory/toggled' : {
      return {
        ...state,
        toggleCategoryEdit: !state.toggleCategoryEdit
      }
    }
    case 'editCategory/renameToggled': {
      return {
        ...state,
        toggleCategoryRename: !state.toggleCategoryRename
      }
    }
    case 'editCategory/setName': {
      return {
        ...state,
        category: action.payload
      }
    }
    case 'editCategory/setCategoryId': {
      return {
        ...state,
        categoryId: action.payload
      }
    }
    case 'fetchFlashcards/request': {
      return {
        ...state,
        isFetching: true,
        hasError: false
      }
    }
    case 'fetchFlashcards/success': {
      return {
        ...state,
        isFetching: false,
        flashcards: [...action.payload]
      }
    }
    case 'fetchFlashcards/failure': {
      return {
        ...state,
        isFetching: false,
        hasError: true
      }
    }
    case 'selectFlashcards/added': {
      return {
        ...state,
        selectedFlashcards: [...state.selectedFlashcards, action.payload]
      }
    }
    case 'selectFlashcards/removed': {
      return {
        ...state,
        selectedFlashcards: state.selectedFlashcards.filter((id: String) => 
        id !== action.payload)
      }
    }
    case 'selectFlashcards/cleared': {
      return {
        ...state,
        selectedFlashcards: []
      }
    }
    case 'selectFlashcards/toggled': {
      return {
        ...state,
        toggleCheckboxes: !state.toggleCheckboxes,
        toggleRadios: false,
        selectedRadioId: '',
        sideA: '',
        sideB: ''
      }
    }
    case 'editFlashcard/toggled': {
      return {
        ...state,
        toggleRadios: !state.toggleRadios,
        toggleCheckboxes: false,
        selectedFlashcards: []
      }
    }
    case 'editFlashcard/selected': {
      return {
        ...state,
        selectedRadioId: action.payload
      }
    }
    case 'editFlashcard/cleared': {
      return {
        ...state,
        selectedRadioId: ''
      }
    }
    case 'createFlashcard/setSideA': {
      return {
        ...state,
        sideA: action.payload
      }
    }
    case 'createFlashcard/setSideB': {
      return {
        ...state,
        sideB: action.payload
      }
    }
    case 'createFlashcard/cleared': {
      return {
        ...state,
        sideA: '',
        sideB: ''
      }
    }
    default:
      return state
  }
}