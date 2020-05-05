/// <reference types="Cypress" />

context('Modal', () => {

    beforeEach(() => {
      cy.visit('http://localhost:3000/')
      cy.get('.row')    // This is for the table to render
    })
  
    it('Test if graphics button shows', () => {
      cy.get('button.graphButton').contains('Graphics')
    })

    it('Test if modal is invisble from start', () => {
        cy.get('.ReactModal__Overlay').should('not.exist')
      })

    it('Test if modals shows on button click', () => {
        cy.get('button.graphButton').click()
        cy.get('.ReactModal__Overlay').should('exist')
      })
  })
  