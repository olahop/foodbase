/// <reference types="Cypress" />

context('Tests if data is fetched', () => {

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
  
    it('Test if first row is Adzukibønner', () => {
      cy.get('.row:first').should('contain','Adzukibønner')
    });

    it('Test if 20 foods are fetched', () => {
      cy.get('.responsiveTable').find('.row').should('have.length',20)
    });
  })
    