// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

let firstname = 'firstname';
let lastname = 'lastname';

before(() => {
    cy.randomString().then(str => firstname = str)
    cy.randomString().then(str => lastname = str)
    cy.viewport(1440, 1200)
});

beforeEach(() => {
    cy.login()
})

afterEach(() => cy.wait(4000))

Cypress.Commands.add('getClientFirstAndLastName', () => [firstname, lastname]);

Cypress.Commands.add('randomString', () => {
    let random_string = '';
    let random_ascii;
    let string_length = 6;
    for (let i = 0; i < string_length; i++) {
        random_ascii = Math.floor((Math.random() * 25) + 97);
        random_string += String.fromCharCode(random_ascii)
    }
    return random_string
});