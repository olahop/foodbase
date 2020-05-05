/// <reference types="Cypress" />

context('TableRow', () => {

    beforeEach(() => {
      cy.visit('http://localhost:3000/')
      cy.get('.row')    // This is for the table to render
    })

    it('Test that extra info does not show before click', () => {
        cy.get('.responsiveTable').should('not.contain','.expanded-row')
      })

    it('Test that extra info shows after click', () => {
        cy.get('.row:first').click()
        cy.get('.responsiveTable').find('.expanded-row').should('have.length', 1)
    })

    it('Test that all extra info is shown after click', () => {
        cy.get('.row:first').click()
        cy.get('.expanded-row').contains('KiloJoule')
        cy.get('.expanded-row').contains('Rating')
        cy.get('.expanded-row').contains('KiloCalories')
        cy.get('.expanded-row').contains('Category')
    })

    it('Test that extra info does not show after clicking on the chosen product', () => {
        cy.get('.row:first').click()
        cy.get('.row:first').click()
        cy.get('.responsiveTable').should('not.contain','.expanded-row')
      })

  })
  