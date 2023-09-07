import React, { useRef } from "react"
import { useFlashcards, useFlashcardsDispatch } from '../../FlashcardsContext'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

export const Formv2 = ({ category, fetchData } : { category: string, fetchData: any}) => {
  const { sideA, sideB, selectedRadioId, categoryId } = useFlashcards()
  const dispatch = useFlashcardsDispatch()
  const inputElement = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const { data: session } = useSession()

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if ( !session ) {
      await router.push('/api/auth/signin')
    }
    try {
      if ( selectedRadioId?.length ) {
        const body = { selectedRadioId, sideA, sideB }
        await fetch('/api/flashcards', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        })
        dispatch({type: 'editFlashcard/toggled'})
        dispatch({type: 'editFlashcard/cleared'})
      } else {
        const body = { sideA, sideB, category: category, categoryId };
        await fetch('/api/flashcards', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
      }
      dispatch({type: 'createFlashcard/cleared'})
      fetchData()
      inputElement.current?.focus()
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <form 
      onSubmit={submitData}
      style={{ display: "flex", flexGrow: 2, flexWrap: 'wrap' }}
    >
      <input
        autoFocus
        placeholder="Front text"
        type="text"
        value={sideA}
        onChange={(e) => dispatch({type: 'createFlashcard/setSideA', payload: e.target.value})}
        ref={inputElement}
        style={{ flexGrow: 1 }}
      />
      <input
        placeholder="Back text"
        type="text"
        value={sideB}
        onChange={(e) => dispatch({type: 'createFlashcard/setSideB', payload: e.target.value})}
        style={{ flexGrow: 1 }}
      />
      <input 
        disabled={!sideA || !sideB} 
        type="submit" 
        value={selectedRadioId?.length ? "Update" : "Create"} 
      />
    </form>
  )
}