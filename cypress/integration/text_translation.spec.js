/// <reference types="cypress" />

context('Text translation tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Test the automatic language recognition for two languages', () => {
    // Iterate trough fixture json file and pick per language details
    const languages = require('../fixtures/languages');
    Object.entries(languages).forEach((entry) => {
      const [language, { text, englishText }] = entry;

      specify(`Detect ${language} language`, () => {
        // Set languages
        cy.selectSourceLanguage('Detect language');
        cy.selectTargetLanguage('English');

        // Provide text to translate
        cy.getSourceInput().type(text);
        cy.waitUntilTranslationComplete();

        // Check detected language and translated text
        cy.getSelectedSourceLanguage().should('have.text', `${language} - detected`);
        cy.getResult().should('have.text', englishText);
      });
    });
  });

  describe('Test the manual language picker', () => {
    specify('Translate from Latin language', () => {
      // Pick Latin details for this test from a fixture json file
      cy.fixture('languages').then((json) => {
        const language = 'Latin';
        const { text, englishText } = json[language];

        // Set languages
        cy.selectSourceLanguage(language);
        cy.selectTargetLanguage('English');

        // Provide text to translate
        cy.getSourceInput().type(text);
        cy.waitUntilTranslationComplete();

        // Check that languages are set correctly and translated text
        cy.getSelectedSourceLanguage().should('have.text', language);
        cy.getSelectedTargetLanguage().should('have.text', 'English');
        cy.getResult().should('have.text', englishText);
      });
    });
  });

  describe('Test the language exchange option', () => {
    specify(`Exchange Latin - English translations`, () => {
      // Pick Latin details for this test from a fixture json file
      cy.fixture('languages').then((json) => {
        const language = 'Latin';
        const { text, englishText } = json[language];

        // Set languages
        cy.selectSourceLanguage(language);
        cy.selectTargetLanguage('English');

        // Provide text to translate
        cy.getSourceInput().type(text);
        cy.waitUntilTranslationComplete();

        // Swap languages, check that languages are set correctly
        cy.swapLanguages();
        cy.getSelectedSourceLanguage().should('have.text', 'English');
        cy.getSelectedTargetLanguage().should('have.text', language);
        // Check that original text and translation are swaped as well
        cy.getSourceInput().siblings().should('have.text', englishText);
        cy.getResult().should('have.text', text);
      });
    });
  });

  describe('Test the delete text option', () => {
    const text = 'Lorem ipsum dolor sit amet.';
    specify('Delete text', () => {
      // Set languages
      cy.selectSourceLanguage('Detect language');
      cy.selectTargetLanguage('Latin');

      // Provide text to translate
      cy.getSourceInput().type(text);
      cy.waitUntilTranslationComplete();
      cy.getSourceInput().siblings().should('have.text', text);
      cy.getResult().should('have.text', text);

      // Clear text and check that source input is empty and target has placeholder
      cy.get('.source-input .clear').click();
      cy.getSourceInput().siblings().should('not.have.text');
      cy.get('.results-container .empty-placeholder').should('have.text', 'Translation');
    });
  });
});
