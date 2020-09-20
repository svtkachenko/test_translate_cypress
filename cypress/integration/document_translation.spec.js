/// <reference types="cypress" />

context('Document translation tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  context('Test the document translation functionality', () => {
    specify('Translate document', () => {
      cy.get('.tlid-input-button-docs').click();
      cy.selectSourceLanguage('Latin');
      cy.selectTargetLanguage('English');
      cy.get('#tlid-file-input').attachFile('upload.txt');
      cy.get('.tlid-translate-doc-button').click();
      cy.get('body').should('have.text', 'I think, therefore I am.');
    });
  });
});
