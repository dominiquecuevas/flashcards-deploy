import { createContext, useContext, useReducer} from 'react'
import { FlashcardProps } from './components/Flashcard/Flashcardv2'

type FlashcardsType = {
  category: string
  categoryId: string
  toggleMoreMenu: boolean
  toggleCategoryRename: boolean
  toggleFormModal: boolean
  flashcards: Array<FlashcardProps>
  isFetching: boolean
  hasError: boolean
  selectedFlashcards: Array<string>
  toggleCheckboxes: boolean
  sideA: string
  sideB: string
  toggleRadios: boolean
  selectedRadioId: string
  sorting: string
}

const FlashcardsContext = createContext<FlashcardsType>({} as FlashcardsType)
const FlashcardsDispatchContext = createContext<any>(null)

const initialFlashcards = {
  category: '',
  categoryId: '',
  toggleMoreMenu: false,
  toggleCategoryRename: false,
  toggleFormModal: false,
  flashcards: [],
  isFetching: false,
  hasError: false,
  selectedFlashcards: [],
  toggleCheckboxes: false,
  sideA: '',
  sideB: '',
  toggleRadios: false,
  selectedRadioId: '',
  sorting: 'default'
}

export function FlashcardsProvider ({ children } : { children: React.ReactNode }) {
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

function flashcardsReducer(state: FlashcardsType, action: any) {
  switch (action.type) {
    case 'moreMenu/toggled' : {
      return {
        ...state,
        toggleMoreMenu: !state.toggleMoreMenu
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
    case 'flashcardsFormToggle/toggled': {
      return {
        ...state,
        toggleFormModal: action.payload
      }
    }
    case 'postFlashcard/added': {
      return {
        ...state,
        flashcards: [action.payload, ...state.flashcards]
      }
    }
    case 'putFlashcard/edit': {
      return {
        ...state,
        flashcards: state.flashcards.map((flashcard) => {
          if (flashcard.id === action.payload.selectedRadioId) {
            return {
              ...flashcard, 
              sideA: action.payload.sideA,
              sideB: action.payload.sideB
            }
          }
          else return {...flashcard}
        })
      }
    }
    case 'deleteFlashcards/removed': {
      return {
        ...state,
        flashcards: state.flashcards?.filter(flashcards => {
          for (let i = 0; i < action.payload.length; i++) {
            if (action.payload[i] === flashcards.id) {
              return false
            }
          }
          return true
        })
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
        selectedFlashcards: state.selectedFlashcards?.filter((id: String) => 
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
        toggleRadios: action.payload,
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
    case 'sortFlashcards/set': {
      return {
        ...state,
        sorting: action.payload
      }
    }
    default:
      return state
  }
}