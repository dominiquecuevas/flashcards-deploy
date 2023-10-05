import React, { SyntheticEvent, useRef } from "react"
import { useFlashcards, useFlashcardsDispatch } from '../../FlashcardsContext'
import { useRouter } from 'next/router'
import { useWindowListener } from "../../../utilities"
import Link from "next/link"

export const Formv2 = ({ category } : { category: string }) => {
  const { sideA, sideB, selectedRadioId, categoryId, toggleFormModal } = useFlashcards()
  const dispatch = useFlashcardsDispatch()
  const ref = useRef<any>(null)
  const router = useRouter()

  useWindowListener('click', (event) => {
    if ( toggleFormModal && !ref.current.contains(event.target) ) {
      dispatch({type: 'flashcardsFormToggle/toggled', payload: false})
      dispatch({type: 'editFlashcard/toggled', payload: false})
      dispatch({type: 'editFlashcard/cleared'})
      dispatch({type: 'createFlashcard/cleared'})
    }
  })

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if ( selectedRadioId?.length ) {
      const body = { selectedRadioId, sideA, sideB }
      dispatch({type: 'putFlashcard/edit', payload: body})
      dispatch({type: 'createFlashcard/cleared'})
      dispatch({type: 'editFlashcard/toggled', payload: false})
      dispatch({type: 'editFlashcard/cleared'})
      dispatch({type: 'flashcardsFormToggle/toggled', payload: false})
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

  const handleClickClose = (event: SyntheticEvent) => {
    event.preventDefault()
    dispatch({type: 'flashcardsFormToggle/toggled'})
    dispatch({type: 'editFlashcard/toggled', payload: false})
    dispatch({type: 'editFlashcard/cleared'})
    dispatch({type: 'createFlashcard/cleared'})
  }

  return (
    <div className="flashcard-form-modal-backdrop backdrop">
      <div
        className="flashcard-form-modal"
        ref={ref}
      >
        <Link href="" onClick={handleClickClose}>X</Link>
        <form 
          onSubmit={submitData}
          className="flashcard-form"
          name="flashcard"
          data-test="flashcard-form"
        >
            <textarea
              name="Front text"
              placeholder="Front text"
              value={sideA}
              onChange={(e) => dispatch({type: 'createFlashcard/setSideA', payload: e.target.value})}
            />
            <textarea
              name="Back text"
              placeholder="Back text"
              value={sideB}
              onChange={(e) => dispatch({type: 'createFlashcard/setSideB', payload: e.target.value})}
            />
            <input 
              disabled={!sideA || !sideB} 
              type="submit" 
              value={selectedRadioId?.length ? "Update" : "Create"} 
            />
        </form>
      </div>
    </div>
  )
}