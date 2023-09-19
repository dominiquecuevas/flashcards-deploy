import React, { useRef } from "react"
import { useFlashcards, useFlashcardsDispatch } from '../../FlashcardsContext'
import { useRouter } from 'next/router'

export const Formv2 = ({ category } : { category: string }) => {
  const { sideA, sideB, selectedRadioId, categoryId } = useFlashcards()
  const dispatch = useFlashcardsDispatch()
  const inputElement = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if ( selectedRadioId?.length ) {
      const body = { selectedRadioId, sideA, sideB }
      dispatch({type: 'putFlashcard/edit', payload: body})
      dispatch({type: 'createFlashcard/cleared'})
      dispatch({type: 'editFlashcard/toggled'})
      await fetch('/api/flashcards', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      .then(async res => {
        if (res.status === 401) {
          await router.push('/api/auth/signin')
        } else if (!res.ok) {
          throw res
        }
      })
      .catch(error => {
        console.log(error)
      })
    } else if ( sideA && sideB ) {
      const body = { sideA, sideB, category: category, categoryId }
      dispatch({type: 'createFlashcard/cleared'})
      await fetch('/api/flashcards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else if (res.status === 401) {
          router.push('/api/auth/signin')
        } else if (!res.ok) {
          throw res
        }
      })
      .then(data => {
        dispatch({type: 'postFlashcard/added', payload: data})
      })
      .catch(error => {
        console.log(error)
      })
    }
    inputElement.current?.focus()
  }
  
  return (
    <form 
      onSubmit={submitData}
      style={{ display: "flex", flexGrow: 2, flexWrap: 'wrap' }}
      name="flashcard"
      data-test="flashcard-form"
    >
      <input
        autoFocus
        name="Front text"
        placeholder="Front text"
        type="text"
        value={sideA}
        onChange={(e) => dispatch({type: 'createFlashcard/setSideA', payload: e.target.value})}
        ref={inputElement}
        style={{ flexGrow: 1 }}
      />
      <input
        name="Back text"
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