/// <reference types="Cypress" />

context('Tests if search affects data', () => {

  let polyfill;
  
  before(() => {
    const polyfillUrl = 'https://unpkg.com/whatwg-fetch@3.0.0/dist/fetch.umd.js';
    cy.request(polyfillUrl).then(response => {
      polyfill = response.body;
    });
    Cypress.on('window:before:load', win => {
      delete win.fetch;
      win.eval(polyfill);
    });
  });

  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('Test that only finds eggeplomme when typing', () => {
    cy.get('input.searchTerm').type('Eggeplomme')
    cy.get('.responsiveTable').find('.row').should('have.length', 1)
    cy.get('.row').contains('Eggeplomme')
  });

  it('Test if Adzukibønner is removed when typing in å', () => {
    cy.get('.row:first').should('contain','Adzukibønner')
    cy.get('input.searchTerm').type('å')
    cy.get('.row:first').should('not.contain','Adzukibønner')
  });
})
  