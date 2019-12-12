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
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })


Cypress.Commands.add('login', () => {
    cy.visit(Cypress.env('baseUrl'))
    cy.wait(3000)
    cy.get('#uid').type(Cypress.env('username'))
    cy.get('#pwd').type(Cypress.env('password'))
    cy.get('#login-button').click()
});

Cypress.Commands.add('selectClient', (firstName, lastName) => {
    cy.visit(Cypress.env('baseUrl') + 'clients')
    cy.get('#searchText').type(firstName + ' ' + lastName)
    cy.get('#clientSearch').click()
    cy.get('tbody tr:first').click()
});

Cypress.Commands.add('selectLoanAccount', (firstName, lastName) => {
    cy.selectClient(firstname, lastName)
    cy.get('tbody tr:first').click()
});