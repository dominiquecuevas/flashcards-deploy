/// <reference types="Cypress" />

describe('Flashcards page', () => {
  it('shows flashcards', () => {
    const category = 'French'
    cy.intercept(`/api/flashcards?category=${category}`).as(`get${category}Flashcards`)

    cy.visit(`/flashcards/${category}`)
    cy.wait(`@get${category}Flashcards`)
    cy.get('.category-header')
      .should('contain', category)
  })
})