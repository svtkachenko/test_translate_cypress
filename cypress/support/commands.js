// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
import 'cypress-file-upload';

/**
 * Open source language picker.
 */
Cypress.Commands.add('openSourceLanguagePicker', () => {
  cy.get('.sl-more').click();
});

/**
 * Open target language picker.
 */
Cypress.Commands.add('openTargetLanguagePicker', () => {
  cy.get('.tl-more').click();
});

/**
 * Swap source and target languages, causes translate request.
 */
Cypress.Commands.add('swapLanguages', () => {
  cy.get('.swap').click();
  cy.waitUntilTranslationComplete();
});

/**
 * Select source language.
 * @param {string} language Source lnaguage name
 *
 * @example cy.selectSourceLanguage('English')
 */
Cypress.Commands.add('selectSourceLanguage', (language) => {
  cy.openSourceLanguagePicker()
    .get('.language_list_sl_list .language_list_item')
    .contains(language)
    .click({ force: true });
});

/**
 * Select target language.
 * @param {string} language Source lnaguage name
 *
 * @example cy.selectTargetLanguage('English')
 */
Cypress.Commands.add('selectTargetLanguage', (language) => {
  cy.openTargetLanguagePicker()
    .get('.language_list_tl_list .language_list_item')
    .contains(language)
    .click({ force: true });
});

/**
 * Get an element with a current source language.
 */
Cypress.Commands.add('getSelectedSourceLanguage', () => {
  cy.get('.sl-sugg .jfk-button-checked');
});

/**
 * Get an element with a current target language.
 */
Cypress.Commands.add('getSelectedTargetLanguage', () => {
  cy.get('.tl-sugg .jfk-button-checked');
});

/**
 * Wait fot translation request to be finished.
 */
Cypress.Commands.add('waitUntilTranslationComplete', () => {
  cy.server();
  cy.route('POST', '/log*').as('translate');
  cy.wait('@translate');
});

Cypress.Commands.add('getSourceInput', () => {
  cy.get('textarea#source');
});

Cypress.Commands.add('getResult', () => {
  cy.get('.result .translation');
});
