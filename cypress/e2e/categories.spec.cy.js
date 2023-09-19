/// <reference types="Cypress" />

describe('Category page', () => {
  beforeEach(() => {
    cy.visit('/categories')
  })

  it('should show a category deck', () => {
    cy.intercept('/api/categories').as('getCategories')
    cy.wait('@getCategories')
    cy.get('.deck').should('be.visible')
  })

  it('adding a category should redirect to signin page for unauth user', () => {
    const categoryName = 'Vocabulary'
    cy.get('input[placeholder="New Category"]')
      .focus()
      .type(categoryName)
      .get('input[type="submit"]')
      .click()
    cy.get('.signin')
      .should('contain', 'Sign in with Google')
  })

  it('should add a category for an authenticated user', () => {
    const categoryName = 'Anatomy'
    cy.intercept('POST', '/api/category', (req) => {
      return req.reply(req.body)
    })
    cy.get('input[placeholder="New Category"]')
      .focus()
      .type(categoryName)
      .get('input[type="submit"]')
      .click()
    cy.get('.category-header')
      .should('contain', categoryName)
  })

})