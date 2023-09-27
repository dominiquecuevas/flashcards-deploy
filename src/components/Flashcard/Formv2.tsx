import React, { useRef } from "react"
import { useFlashcards, useFlashcardsDispatch } from '../../FlashcardsContext'
import { useRouter } from 'next/router'
import { EditButton } from "./EditButton"

export const Formv2 = ({ category } : { category: string }) => {
  const { sideA, sideB, selectedRadioId, categoryId, toggleRadios } = useFlashcards()
  const dispatch = useFlashcardsDispatch()
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
        if (!res.ok) {
          throw res
        }
      })
      .catch(error => {
        console.log(error)
        if (error.status === 401) {
          router.push('/api/auth/signin')
        }
      })
    } else {
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
        } else {
          throw res
        }
      })
      .then(data => {
        dispatch({type: 'postFlashcard/added', payload: data})
      })
      .catch(error => {
        console.log(error)
        if (error.status === 401) {
          router.push('/api/auth/signin')
        }
      })
    }
  }

  const handleEditClick = () => {
    dispatch({type: 'editFlashcard/toggled'})
    dispatch({type: 'editFlashcard/cleared'})
    dispatch({type: 'createFlashcard/cleared'})
  }

  return (
    <form 
      onSubmit={submitData}
      name="flashcard"
      data-test="flashcard-form"
      style={{ display: "flex", flexWrap: "wrap", padding: "var(--margin-preset)" }}
    >
      <div
        style={{ display: "flex", flexGrow: 1, flexWrap: "wrap" }}
      >
        <input
          name="Front text"
          placeholder="Front text"
          type="text"
          value={sideA}
          onChange={(e) => dispatch({type: 'createFlashcard/setSideA', payload: e.target.value})}
          style={{ flexGrow: 1, minWidth: 240}}
        />
        <input
          name="Back text"
          placeholder="Back text"
          type="text"
          value={sideB}
          onChange={(e) => dispatch({type: 'createFlashcard/setSideB', payload: e.target.value})}
          style={{ flexGrow: 1, minWidth: 240 }}
        />
      </div>
      <div
        style={{ justifySelf: "flex-end" }}
      >
        <input 
          disabled={!sideA || !sideB} 
          type="submit" 
          value={selectedRadioId?.length ? "Update" : "Create"} 
        />
        <input 
          type="button" 
          onClick={handleEditClick} 
          value={!toggleRadios ? 'Edit' : 'Cancel'} 
        />
      </div>
    </form>
  )
}