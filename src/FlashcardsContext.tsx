import { createContext, ReactNode, useContext, useEffect, useReducer} from 'react'

const FlashcardsContext = createContext(null)
const FlashcardsDispatchContext = createContext(null)

const initialFlashcards = {
  flashcards: [],
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
    case 'fetch_flashcards': {
      return {
        ...state,
        flashcards: [...action.payload]
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
        selectedFlashcards: state.selectedFlashcards.filter((id) => 
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