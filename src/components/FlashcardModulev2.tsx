import React, { useEffect, useState } from 'react'
import { Flashcardv2 } from './Flashcardv2'
import { useFlashcards, useFlashcardsDispatch } from '../FlashcardsContext'

export const FlashcardModulev2 = (props) => {
  const { category, fetchData } = props
  const { flashcards, selectedFlashcards, toggleRadios } = useFlashcards()
  const dispatch = useFlashcardsDispatch()

  useEffect(() => {
    fetchData()
  }, [])

  flashcards.sort((a, b) => {
    if (a.updatedAt < b.updatedAt) {
      return 1;
    }
    if (a.updatedAt > b.updatedAt) {
      return -1;
    }
    return 0;
  })
  const cardSides = flashcards.map(flashcard => (
    <label 
      key={flashcard?.id} 
      htmlFor={toggleRadios ? `radio-${flashcard.id}` : `checkbox-${flashcard.id}`}
    >
      <Flashcardv2 
        flashcard={flashcard}
      />
    </label>
  ))
  return (
    <div className="flashcard-container">
      {cardSides}
    </div>
  )
}